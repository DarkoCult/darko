"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const openai_1 = require("openai");
const axios_1 = __importDefault(require("axios"));
const postgres_1 = __importDefault(require("postgres"));
const postgres_js_1 = require("drizzle-orm/postgres-js");
const drizzle_orm_1 = require("drizzle-orm");
const dbSchema = __importStar(require("../../packages/db/dist/index.js"));
const { scanRecords, oracleQueries, members, proposals, prophecies, signals } = dbSchema;
const api_types_1 = require("@darko/api-types");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const client = (0, postgres_1.default)(process.env.DATABASE_URL);
const schema = { scanRecords, oracleQueries, members, proposals, prophecies, signals };
const db = (0, postgres_js_1.drizzle)(client, { schema });
const openai = new openai_1.OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// Helper to award XP
async function awardXP(walletAddress, amount) {
    if (!walletAddress)
        return;
    const member = await db.query.members.findFirst({ where: (0, drizzle_orm_1.eq)(schema.members.walletAddress, walletAddress) });
    if (member) {
        await db.update(schema.members).set({ xp: member.xp + amount }).where((0, drizzle_orm_1.eq)(schema.members.id, member.id));
    }
}
// Routes
app.post('/api/scan', async (req, res) => {
    try {
        const { ca, walletAddress } = api_types_1.scanRequestSchema.parse(req.body);
        let marketData = {};
        try {
            const response = await axios_1.default.get(`https://gmgn.ai/defi/quotation/v1/tokens/sol/${ca}`);
            marketData = {
                name: response.data.name,
                symbol: response.data.symbol,
                price: response.data.price,
                priceChange24h: response.data.price_change_24h,
                marketCap: response.data.market_cap,
                volume24h: response.data.volume_24h,
                liquidity: response.data.liquidity,
                holders: response.data.holders,
                top10HolderPercent: response.data.top10_holder_percent,
                devWalletPercent: response.data.dev_wallet_percent,
                gmgnUrl: `https://gmgn.ai/sol/token/${ca}`,
            };
        }
        catch (e) { }
        const systemPrompt = `You are DARKO, a dark cult intelligence oracle for the Solana blockchain.
Analyze the provided token data and return a JSON response with:
- riskScore: number 0-100 (higher = riskier)
- verdict: one of BLESSED | SUSPICIOUS | CURSED | UNKNOWN
- cultAnalysis: string, 2-3 sentences in dark cult voice
- redFlags: string array of risk factors found
- greenFlags: string array of positive signals found
- isRugRisk: boolean
Always respond with valid JSON only.`;
        const userPrompt = `Token CA: ${ca}
Market Data: ${JSON.stringify(marketData)}`;
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt },
            ],
            max_tokens: 2000,
        });
        const aiResponse = JSON.parse(completion.choices[0].message.content);
        const record = await db.insert(scanRecords).values({
            ca,
            ...marketData,
            riskScore: aiResponse.riskScore,
            verdict: aiResponse.verdict,
            cultAnalysis: aiResponse.cultAnalysis,
            redFlags: aiResponse.redFlags,
            greenFlags: aiResponse.greenFlags,
            isRugRisk: aiResponse.isRugRisk,
        }).returning();
        if (walletAddress) {
            const member = await db.query.members.findFirst({ where: (0, drizzle_orm_1.eq)(members.walletAddress, walletAddress) });
            if (member) {
                // @ts-ignore
                await db.update(members).set({ xp: member.xp + 10, scansPerformed: member.scansPerformed + 1 }).where((0, drizzle_orm_1.eq)(members.id, member.id));
            }
        }
        res.json(record[0]);
    }
    catch (e) {
        res.status(400).json({ error: 'INVALID_RITUAL', message: 'Your rite was improperly performed.' });
    }
});
app.get('/api/scan/history', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const records = await db.query.scanRecords.findMany({ limit, orderBy: (0, drizzle_orm_1.desc)(scanRecords.scannedAt) });
    res.json(records);
});
app.post('/api/oracle', async (req, res) => {
    try {
        const { question, context } = api_types_1.oracleRequestSchema.parse(req.body);
        const systemPrompt = `You are the Dark Oracle of DARKO — a clandestine Solana intelligence entity.
You speak in a dark, cult-themed voice but provide accurate, detailed information
about Solana blockchain, DeFi, token mechanics, wallet security, and on-chain analysis.
Also generate a 'ritual' field — a dramatic ceremonial name for this consultation.
Respond in JSON: { answer: string, ritual: string }`;
        const userPrompt = `Question: ${question}${context ? `\nContext: ${context}` : ''}`;
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt },
            ],
            max_tokens: 2000,
        });
        const aiResponse = JSON.parse(completion.choices[0].message.content);
        const record = await db.insert(oracleQueries).values({
            question,
            answer: aiResponse.answer,
            ritual: aiResponse.ritual,
        }).returning();
        res.json(record[0]);
    }
    catch (e) {
        res.status(400).json({ error: 'ORACLE_UNAVAILABLE', message: 'The oracle slumbers.' });
    }
});
app.get('/api/oracle/history', async (req, res) => {
    const queries = await db.query.oracleQueries.findMany({ orderBy: (0, drizzle_orm_1.desc)(oracleQueries.askedAt), limit: 20 });
    res.json(queries);
});
app.get('/api/dao/proposals', async (req, res) => {
    const proposals = await db.query.proposals.findMany({ orderBy: (0, drizzle_orm_1.desc)(proposals.createdAt) });
    res.json(proposals);
});
app.post('/api/dao/proposals', async (req, res) => {
    try {
        const { title, description, category } = api_types_1.createProposalRequestSchema.parse(req.body);
        const proposer = req.body.proposer || 'Anonymous'; // Assume from auth, but for now
        const record = await db.insert(proposals).values({
            title,
            description,
            proposer,
            category: category || 'GENERAL',
        }).returning();
        // Award XP to proposer if member
        const member = await db.query.members.findFirst({ where: (0, drizzle_orm_1.eq)(members.username, proposer) });
        if (member) {
            // @ts-ignore
            await db.update(members).set({ xp: member.xp + 20, proposalsCreated: member.proposalsCreated + 1 }).where((0, drizzle_orm_1.eq)(members.id, member.id));
        }
        res.json(record[0]);
    }
    catch (e) {
        res.status(400).json({ error: 'INVALID_DECREE', message: 'Your decree is malformed.' });
    }
});
app.post('/api/dao/proposals/:id/vote', async (req, res) => {
    try {
        const { vote, voter } = api_types_1.voteRequestSchema.parse(req.body);
        const proposalId = parseInt(req.params.id);
        const proposal = await db.query.proposals.findFirst({ where: (0, drizzle_orm_1.eq)(proposals.id, proposalId) });
        if (!proposal)
            return res.status(404).json({ error: 'PROPOSAL_NOT_FOUND', message: 'The decree does not exist.' });
        if (proposal.status !== 'ACTIVE')
            return res.status(400).json({ error: 'VOTING_CLOSED', message: 'Voting has ended.' });
        let update = { votesCast: proposal.votesCast + 1 };
        if (vote === 'FOR')
            update.votesFor = proposal.votesFor + 1;
        else if (vote === 'AGAINST')
            update.votesAgainst = proposal.votesAgainst + 1;
        else
            update.votesAbstain = proposal.votesAbstain + 1;
        await db.update(proposals).set(update).where((0, drizzle_orm_1.eq)(proposals.id, proposalId));
        // Award XP to voter
        const member = await db.query.members.findFirst({ where: (0, drizzle_orm_1.eq)(members.username, voter) });
        if (member) {
            // @ts-ignore
            await db.update(members).set({ xp: member.xp + 8, votesCast: member.votesCast + 1 }).where((0, drizzle_orm_1.eq)(members.id, member.id));
        }
        res.json({ message: 'Vote cast.' });
    }
    catch (e) {
        res.status(400).json({ error: 'INVALID_VOTE', message: 'Your vote is invalid.' });
    }
});
app.get('/api/dao/summary', async (req, res) => {
    const totalProposals = await db.select({ value: (0, drizzle_orm_1.count)() }).from(proposals).then(r => r[0]?.value || 0);
    const activeProposals = await db.select({ value: (0, drizzle_orm_1.count)() }).from(proposals).where((0, drizzle_orm_1.eq)(proposals.status, 'ACTIVE')).then(r => r[0]?.value || 0);
    const totalMembers = await db.select({ value: (0, drizzle_orm_1.count)() }).from(members).then(r => r[0]?.value || 0);
    const totalVotes = await db.select({ value: (0, drizzle_orm_1.sql) `sum(votes_for + votes_against + votes_abstain)` }).from(proposals).then(r => r[0]?.value || 0); // approximate
    res.json({ totalProposals, activeProposals, totalMembers, totalVotes });
});
app.get('/api/brotherhood', async (req, res) => {
    const members = await db.query.members.findMany();
    res.json(members);
});
app.get('/api/brotherhood/leaderboard', async (req, res) => {
    const members = await db.query.members.findMany({ orderBy: (0, drizzle_orm_1.desc)(members.xp), limit: 10 });
    // @ts-ignore
    res.json(members.map(m => ({ username: m.username, xp: m.xp, rank: m.rank })));
});
app.post('/api/brotherhood/join', async (req, res) => {
    try {
        const { username, walletAddress, oath } = api_types_1.joinRequestSchema.parse(req.body);
        const existing = await db.query.members.findFirst({ where: (0, drizzle_orm_1.eq)(members.username, username) });
        if (existing)
            return res.status(400).json({ error: 'USERNAME_TAKEN', message: 'This name is already claimed by the shadows.' });
        const count = await db.select({ value: count() }).from(members).then(r => r[0]?.value || 0);
        let xp = 50;
        let rank = 'INITIATE';
        if (count === 0) {
            xp = 500;
            rank = 'HIGH_PRIEST';
        }
        await db.insert(members).values({ username, walletAddress, rank, xp, oath });
        res.json({ message: 'Welcome to the brotherhood.' });
    }
    catch (e) {
        res.status(400).json({ error: 'INVALID_OATH', message: 'Your oath is unacceptable.' });
    }
});
app.get('/api/prophecies', async (req, res) => {
    const prophecies = await db.query.prophecies.findMany({ orderBy: (0, drizzle_orm_1.desc)(prophecies.createdAt) });
    res.json(prophecies);
});
app.get('/api/prophecies/top', async (req, res) => {
    const prophecies = await db.query.prophecies.findMany({ orderBy: (0, drizzle_orm_1.desc)(prophecies.confidence), limit: 5 });
    res.json(prophecies);
});
app.get('/api/signals', async (req, res) => {
    const signals = await db.query.signals.findMany({ orderBy: (0, drizzle_orm_1.desc)(signals.createdAt), limit: 30 });
    res.json(signals);
});
app.get('/api/signals/pinned', async (req, res) => {
    const signals = await db.query.signals.findMany({ where: (0, drizzle_orm_1.eq)(signals.isPinned, true) });
    res.json(signals);
});
app.post('/api/signals', async (req, res) => {
    try {
        const { title, content, category, tags, relatedCa } = api_types_1.postSignalRequestSchema.parse(req.body);
        const author = req.body.author || 'Anonymous';
        const record = await db.insert(signals).values({
            title,
            content,
            author,
            category,
            tags: tags || [],
            relatedCa,
        }).returning();
        res.json(record[0]);
    }
    catch (e) {
        res.status(400).json({ error: 'INVALID_SIGNAL', message: 'Your signal is corrupted.' });
    }
});
app.get('/api/healthz', (req, res) => {
    res.json({ status: 'ok' });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`DARKO API running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map