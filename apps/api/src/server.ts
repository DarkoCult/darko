import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import axios from 'axios';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, desc, count, sql } from 'drizzle-orm';
import * as dbSchema from '../../packages/db/dist/index.js';
const { scanRecords, oracleQueries, members, proposals, prophecies, signals } = dbSchema
import {
  scanRequestSchema,
  oracleRequestSchema,
  createProposalRequestSchema,
  voteRequestSchema,
  joinRequestSchema,
  postSignalRequestSchema,
  errorSchema
} from '@darko/api-types';

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const client = postgres(process.env.DATABASE_URL!);
const schema = { scanRecords, oracleQueries, members, proposals, prophecies, signals }
const db = drizzle(client, { schema });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Helper to award XP
async function awardXP(walletAddress: string | undefined, amount: number) {
  if (!walletAddress) return;
  const member = await db.query.members.findFirst({ where: eq(schema.members.walletAddress, walletAddress) });
  if (member) {
    await db.update(schema.members).set({ xp: member.xp + amount }).where(eq(schema.members.id, member.id));
  }
}

// Routes

app.post('/api/scan', async (req, res) => {
  try {
    const { ca, walletAddress } = scanRequestSchema.parse(req.body);
    let marketData: any = {};
    try {
      const response = await axios.get(`https://gmgn.ai/defi/quotation/v1/tokens/sol/${ca}`);
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
    } catch (e) {}
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
      const member = await db.query.members.findFirst({ where: eq(members.walletAddress, walletAddress) });
      if (member) {
        // @ts-ignore
        await db.update(members).set({ xp: member.xp + 10, scansPerformed: member.scansPerformed + 1 }).where(eq(members.id, member.id));
      }
    }
    res.json(record[0]);
  } catch (e) {
    res.status(400).json({ error: 'INVALID_RITUAL', message: 'Your rite was improperly performed.' });
  }
});

app.get('/api/scan/history', async (req, res) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const records = await db.query.scanRecords.findMany({ limit, orderBy: desc(scanRecords.scannedAt) });
  res.json(records);
});

app.post('/api/oracle', async (req, res) => {
  try {
    const { question, context } = oracleRequestSchema.parse(req.body);
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
  } catch (e) {
    res.status(400).json({ error: 'ORACLE_UNAVAILABLE', message: 'The oracle slumbers.' });
  }
});

app.get('/api/oracle/history', async (req, res) => {
  const queries = await db.query.oracleQueries.findMany({ orderBy: desc(oracleQueries.askedAt), limit: 20 });
  res.json(queries);
});

app.get('/api/dao/proposals', async (req, res) => {
  const proposals = await db.query.proposals.findMany({ orderBy: desc(proposals.createdAt) });
  res.json(proposals);
});

app.post('/api/dao/proposals', async (req, res) => {
  try {
    const { title, description, category } = createProposalRequestSchema.parse(req.body);
    const proposer = req.body.proposer || 'Anonymous'; // Assume from auth, but for now
    const record = await db.insert(proposals).values({
      title,
      description,
      proposer,
      category: category || 'GENERAL',
    }).returning();
    // Award XP to proposer if member
    const member = await db.query.members.findFirst({ where: eq(members.username, proposer) });
    if (member) {
      // @ts-ignore
      await db.update(members).set({ xp: member.xp + 20, proposalsCreated: member.proposalsCreated + 1 }).where(eq(members.id, member.id));
    }
    res.json(record[0]);
  } catch (e) {
    res.status(400).json({ error: 'INVALID_DECREE', message: 'Your decree is malformed.' });
  }
});

app.post('/api/dao/proposals/:id/vote', async (req, res) => {
  try {
    const { vote, voter } = voteRequestSchema.parse(req.body);
    const proposalId = parseInt(req.params.id);
    const proposal = await db.query.proposals.findFirst({ where: eq(proposals.id, proposalId) });
    if (!proposal) return res.status(404).json({ error: 'PROPOSAL_NOT_FOUND', message: 'The decree does not exist.' });
    if (proposal.status !== 'ACTIVE') return res.status(400).json({ error: 'VOTING_CLOSED', message: 'Voting has ended.' });
    let update: any = { votesCast: proposal.votesCast + 1 };
    if (vote === 'FOR') update.votesFor = proposal.votesFor + 1;
    else if (vote === 'AGAINST') update.votesAgainst = proposal.votesAgainst + 1;
    else update.votesAbstain = proposal.votesAbstain + 1;
    await db.update(proposals).set(update).where(eq(proposals.id, proposalId));
    // Award XP to voter
    const member = await db.query.members.findFirst({ where: eq(members.username, voter) });
    if (member) {
      // @ts-ignore
      await db.update(members).set({ xp: member.xp + 8, votesCast: member.votesCast + 1 }).where(eq(members.id, member.id));
    }
    res.json({ message: 'Vote cast.' });
  } catch (e) {
    res.status(400).json({ error: 'INVALID_VOTE', message: 'Your vote is invalid.' });
  }
});

app.get('/api/dao/summary', async (req, res) => {
  const totalProposals = await db.select({ value: count() }).from(proposals).then(r => r[0]?.value || 0);
  const activeProposals = await db.select({ value: count() }).from(proposals).where(eq(proposals.status, 'ACTIVE')).then(r => r[0]?.value || 0);
  const totalMembers = await db.select({ value: count() }).from(members).then(r => r[0]?.value || 0);
  const totalVotes = await db.select({ value: sql<number>`sum(votes_for + votes_against + votes_abstain)` }).from(proposals).then(r => r[0]?.value || 0); // approximate
  res.json({ totalProposals, activeProposals, totalMembers, totalVotes });
});

app.get('/api/brotherhood', async (req, res) => {
  const members = await db.query.members.findMany();
  res.json(members);
});

app.get('/api/brotherhood/leaderboard', async (req, res) => {
  const members = await db.query.members.findMany({ orderBy: desc(members.xp), limit: 10 });
  // @ts-ignore
  res.json(members.map(m => ({ username: m.username, xp: m.xp, rank: m.rank })));
});

app.post('/api/brotherhood/join', async (req, res) => {
  try {
    const { username, walletAddress, oath } = joinRequestSchema.parse(req.body);
    const existing = await db.query.members.findFirst({ where: eq(members.username, username) });
    if (existing) return res.status(400).json({ error: 'USERNAME_TAKEN', message: 'This name is already claimed by the shadows.' });
    const count = await db.select({ value: count() }).from(members).then(r => r[0]?.value || 0);
    let xp = 50;
    let rank = 'INITIATE';
    if (count === 0) {
      xp = 500;
      rank = 'HIGH_PRIEST';
    }
    await db.insert(members).values({ username, walletAddress, rank, xp, oath });
    res.json({ message: 'Welcome to the brotherhood.' });
  } catch (e) {
    res.status(400).json({ error: 'INVALID_OATH', message: 'Your oath is unacceptable.' });
  }
});

app.get('/api/prophecies', async (req, res) => {
  const prophecies = await db.query.prophecies.findMany({ orderBy: desc(prophecies.createdAt) });
  res.json(prophecies);
});

app.get('/api/prophecies/top', async (req, res) => {
  const prophecies = await db.query.prophecies.findMany({ orderBy: desc(prophecies.confidence), limit: 5 });
  res.json(prophecies);
});

app.get('/api/signals', async (req, res) => {
  const signals = await db.query.signals.findMany({ orderBy: desc(signals.createdAt), limit: 30 });
  res.json(signals);
});

app.get('/api/signals/pinned', async (req, res) => {
  const signals = await db.query.signals.findMany({ where: eq(signals.isPinned, true) });
  res.json(signals);
});

app.post('/api/signals', async (req, res) => {
  try {
    const { title, content, category, tags, relatedCa } = postSignalRequestSchema.parse(req.body);
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
  } catch (e) {
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