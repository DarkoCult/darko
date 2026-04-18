import { z } from 'zod';

// Common
export const errorSchema = z.object({
  error: z.string(),
  message: z.string(),
});

// Scan
export const scanRequestSchema = z.object({
  ca: z.string(),
  walletAddress: z.string().optional(),
});

export const scanResponseSchema = z.object({
  id: z.number(),
  ca: z.string(),
  name: z.string().nullable(),
  symbol: z.string().nullable(),
  price: z.number().nullable(),
  priceChange24h: z.number().nullable(),
  marketCap: z.number().nullable(),
  volume24h: z.number().nullable(),
  liquidity: z.number().nullable(),
  holders: z.number().nullable(),
  top10HolderPercent: z.number().nullable(),
  devWalletPercent: z.number().nullable(),
  riskScore: z.number(),
  verdict: z.enum(['BLESSED', 'SUSPICIOUS', 'CURSED', 'UNKNOWN']),
  cultAnalysis: z.string().nullable(),
  redFlags: z.array(z.string()),
  greenFlags: z.array(z.string()),
  isRugRisk: z.boolean().nullable(),
  gmgnUrl: z.string().nullable(),
  scannedAt: z.string(),
});

// Oracle
export const oracleRequestSchema = z.object({
  question: z.string(),
  context: z.string().optional(),
});

export const oracleResponseSchema = z.object({
  answer: z.string(),
  ritual: z.string().nullable(),
});

// DAO
export const proposalSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  proposer: z.string(),
  status: z.enum(['ACTIVE', 'PASSED', 'REJECTED', 'PENDING']),
  votesFor: z.number(),
  votesAgainst: z.number(),
  votesAbstain: z.number(),
  category: z.enum(['GENERAL', 'TREASURY', 'PROTOCOL', 'RITUAL', 'ALLIANCE', 'PURGE']),
  endDate: z.string().nullable(),
  createdAt: z.string(),
});

export const createProposalRequestSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string().optional(),
});

export const voteRequestSchema = z.object({
  vote: z.enum(['FOR', 'AGAINST', 'ABSTAIN']),
  voter: z.string(),
});

export const daoSummarySchema = z.object({
  totalProposals: z.number(),
  activeProposals: z.number(),
  totalMembers: z.number(),
  totalVotes: z.number(),
});

// Brotherhood
export const memberSchema = z.object({
  id: z.number(),
  username: z.string(),
  walletAddress: z.string().nullable(),
  rank: z.enum(['INITIATE', 'ACOLYTE', 'DISCIPLE', 'HIGH_PRIEST', 'GRAND_MASTER']),
  xp: z.number(),
  oath: z.string().nullable(),
  scansPerformed: z.number(),
  proposalsCreated: z.number(),
  votesCast: z.number(),
  joinedAt: z.string(),
});

export const joinRequestSchema = z.object({
  username: z.string(),
  walletAddress: z.string().optional(),
  oath: z.string().optional(),
});

export const leaderboardEntrySchema = z.object({
  username: z.string(),
  xp: z.number(),
  rank: z.string(),
});

// Prophecies
export const prophecySchema = z.object({
  id: z.number(),
  tokenName: z.string(),
  tokenSymbol: z.string(),
  ca: z.string().nullable(),
  prophecyText: z.string(),
  signal: z.enum(['ASCEND', 'DESCEND', 'CHAOS', 'STAGNANT']),
  priceTarget: z.number().nullable(),
  confidence: z.number().nullable(),
  source: z.string().nullable(),
  isFulfilled: z.boolean(),
  createdAt: z.string(),
});

// Signals
export const signalSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  author: z.string(),
  category: z.enum(['ALPHA', 'WARNING', 'RITUAL', 'REVELATION', 'PROPHECY']),
  tags: z.array(z.string()),
  relatedCa: z.string().nullable(),
  isPinned: z.boolean(),
  upvotes: z.number(),
  createdAt: z.string(),
});

export const postSignalRequestSchema = z.object({
  title: z.string(),
  content: z.string(),
  category: z.string(),
  tags: z.array(z.string()).optional(),
  relatedCa: z.string().optional(),
});

// Types
export type ScanRequest = z.infer<typeof scanRequestSchema>;
export type ScanResponse = z.infer<typeof scanResponseSchema>;
export type OracleRequest = z.infer<typeof oracleRequestSchema>;
export type OracleResponse = z.infer<typeof oracleResponseSchema>;
export type Proposal = z.infer<typeof proposalSchema>;
export type CreateProposalRequest = z.infer<typeof createProposalRequestSchema>;
export type VoteRequest = z.infer<typeof voteRequestSchema>;
export type DaoSummary = z.infer<typeof daoSummarySchema>;
export type Member = z.infer<typeof memberSchema>;
export type JoinRequest = z.infer<typeof joinRequestSchema>;
export type LeaderboardEntry = z.infer<typeof leaderboardEntrySchema>;
export type Prophecy = z.infer<typeof prophecySchema>;
export type Signal = z.infer<typeof signalSchema>;
export type PostSignalRequest = z.infer<typeof postSignalRequestSchema>;
export type ErrorResponse = z.infer<typeof errorSchema>;