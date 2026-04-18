"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSignalRequestSchema = exports.signalSchema = exports.prophecySchema = exports.leaderboardEntrySchema = exports.joinRequestSchema = exports.memberSchema = exports.daoSummarySchema = exports.voteRequestSchema = exports.createProposalRequestSchema = exports.proposalSchema = exports.oracleResponseSchema = exports.oracleRequestSchema = exports.scanResponseSchema = exports.scanRequestSchema = exports.errorSchema = void 0;
const zod_1 = require("zod");
// Common
exports.errorSchema = zod_1.z.object({
    error: zod_1.z.string(),
    message: zod_1.z.string(),
});
// Scan
exports.scanRequestSchema = zod_1.z.object({
    ca: zod_1.z.string(),
    walletAddress: zod_1.z.string().optional(),
});
exports.scanResponseSchema = zod_1.z.object({
    id: zod_1.z.number(),
    ca: zod_1.z.string(),
    name: zod_1.z.string().nullable(),
    symbol: zod_1.z.string().nullable(),
    price: zod_1.z.number().nullable(),
    priceChange24h: zod_1.z.number().nullable(),
    marketCap: zod_1.z.number().nullable(),
    volume24h: zod_1.z.number().nullable(),
    liquidity: zod_1.z.number().nullable(),
    holders: zod_1.z.number().nullable(),
    top10HolderPercent: zod_1.z.number().nullable(),
    devWalletPercent: zod_1.z.number().nullable(),
    riskScore: zod_1.z.number(),
    verdict: zod_1.z.enum(['BLESSED', 'SUSPICIOUS', 'CURSED', 'UNKNOWN']),
    cultAnalysis: zod_1.z.string().nullable(),
    redFlags: zod_1.z.array(zod_1.z.string()),
    greenFlags: zod_1.z.array(zod_1.z.string()),
    isRugRisk: zod_1.z.boolean().nullable(),
    gmgnUrl: zod_1.z.string().nullable(),
    scannedAt: zod_1.z.string(),
});
// Oracle
exports.oracleRequestSchema = zod_1.z.object({
    question: zod_1.z.string(),
    context: zod_1.z.string().optional(),
});
exports.oracleResponseSchema = zod_1.z.object({
    answer: zod_1.z.string(),
    ritual: zod_1.z.string().nullable(),
});
// DAO
exports.proposalSchema = zod_1.z.object({
    id: zod_1.z.number(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    proposer: zod_1.z.string(),
    status: zod_1.z.enum(['ACTIVE', 'PASSED', 'REJECTED', 'PENDING']),
    votesFor: zod_1.z.number(),
    votesAgainst: zod_1.z.number(),
    votesAbstain: zod_1.z.number(),
    category: zod_1.z.enum(['GENERAL', 'TREASURY', 'PROTOCOL', 'RITUAL', 'ALLIANCE', 'PURGE']),
    endDate: zod_1.z.string().nullable(),
    createdAt: zod_1.z.string(),
});
exports.createProposalRequestSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    category: zod_1.z.string().optional(),
});
exports.voteRequestSchema = zod_1.z.object({
    vote: zod_1.z.enum(['FOR', 'AGAINST', 'ABSTAIN']),
    voter: zod_1.z.string(),
});
exports.daoSummarySchema = zod_1.z.object({
    totalProposals: zod_1.z.number(),
    activeProposals: zod_1.z.number(),
    totalMembers: zod_1.z.number(),
    totalVotes: zod_1.z.number(),
});
// Brotherhood
exports.memberSchema = zod_1.z.object({
    id: zod_1.z.number(),
    username: zod_1.z.string(),
    walletAddress: zod_1.z.string().nullable(),
    rank: zod_1.z.enum(['INITIATE', 'ACOLYTE', 'DISCIPLE', 'HIGH_PRIEST', 'GRAND_MASTER']),
    xp: zod_1.z.number(),
    oath: zod_1.z.string().nullable(),
    scansPerformed: zod_1.z.number(),
    proposalsCreated: zod_1.z.number(),
    votesCast: zod_1.z.number(),
    joinedAt: zod_1.z.string(),
});
exports.joinRequestSchema = zod_1.z.object({
    username: zod_1.z.string(),
    walletAddress: zod_1.z.string().optional(),
    oath: zod_1.z.string().optional(),
});
exports.leaderboardEntrySchema = zod_1.z.object({
    username: zod_1.z.string(),
    xp: zod_1.z.number(),
    rank: zod_1.z.string(),
});
// Prophecies
exports.prophecySchema = zod_1.z.object({
    id: zod_1.z.number(),
    tokenName: zod_1.z.string(),
    tokenSymbol: zod_1.z.string(),
    ca: zod_1.z.string().nullable(),
    prophecyText: zod_1.z.string(),
    signal: zod_1.z.enum(['ASCEND', 'DESCEND', 'CHAOS', 'STAGNANT']),
    priceTarget: zod_1.z.number().nullable(),
    confidence: zod_1.z.number().nullable(),
    source: zod_1.z.string().nullable(),
    isFulfilled: zod_1.z.boolean(),
    createdAt: zod_1.z.string(),
});
// Signals
exports.signalSchema = zod_1.z.object({
    id: zod_1.z.number(),
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    author: zod_1.z.string(),
    category: zod_1.z.enum(['ALPHA', 'WARNING', 'RITUAL', 'REVELATION', 'PROPHECY']),
    tags: zod_1.z.array(zod_1.z.string()),
    relatedCa: zod_1.z.string().nullable(),
    isPinned: zod_1.z.boolean(),
    upvotes: zod_1.z.number(),
    createdAt: zod_1.z.string(),
});
exports.postSignalRequestSchema = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    category: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    relatedCa: zod_1.z.string().optional(),
});
//# sourceMappingURL=index.js.map