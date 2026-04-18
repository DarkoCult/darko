import { z } from 'zod';
export declare const errorSchema: z.ZodObject<{
    error: z.ZodString;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    error: string;
    message: string;
}, {
    error: string;
    message: string;
}>;
export declare const scanRequestSchema: z.ZodObject<{
    ca: z.ZodString;
    walletAddress: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    ca: string;
    walletAddress?: string | undefined;
}, {
    ca: string;
    walletAddress?: string | undefined;
}>;
export declare const scanResponseSchema: z.ZodObject<{
    id: z.ZodNumber;
    ca: z.ZodString;
    name: z.ZodNullable<z.ZodString>;
    symbol: z.ZodNullable<z.ZodString>;
    price: z.ZodNullable<z.ZodNumber>;
    priceChange24h: z.ZodNullable<z.ZodNumber>;
    marketCap: z.ZodNullable<z.ZodNumber>;
    volume24h: z.ZodNullable<z.ZodNumber>;
    liquidity: z.ZodNullable<z.ZodNumber>;
    holders: z.ZodNullable<z.ZodNumber>;
    top10HolderPercent: z.ZodNullable<z.ZodNumber>;
    devWalletPercent: z.ZodNullable<z.ZodNumber>;
    riskScore: z.ZodNumber;
    verdict: z.ZodEnum<["BLESSED", "SUSPICIOUS", "CURSED", "UNKNOWN"]>;
    cultAnalysis: z.ZodNullable<z.ZodString>;
    redFlags: z.ZodArray<z.ZodString, "many">;
    greenFlags: z.ZodArray<z.ZodString, "many">;
    isRugRisk: z.ZodNullable<z.ZodBoolean>;
    gmgnUrl: z.ZodNullable<z.ZodString>;
    scannedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    symbol: string | null;
    ca: string;
    id: number;
    name: string | null;
    price: number | null;
    priceChange24h: number | null;
    marketCap: number | null;
    volume24h: number | null;
    liquidity: number | null;
    holders: number | null;
    top10HolderPercent: number | null;
    devWalletPercent: number | null;
    riskScore: number;
    verdict: "BLESSED" | "SUSPICIOUS" | "CURSED" | "UNKNOWN";
    cultAnalysis: string | null;
    redFlags: string[];
    greenFlags: string[];
    isRugRisk: boolean | null;
    gmgnUrl: string | null;
    scannedAt: string;
}, {
    symbol: string | null;
    ca: string;
    id: number;
    name: string | null;
    price: number | null;
    priceChange24h: number | null;
    marketCap: number | null;
    volume24h: number | null;
    liquidity: number | null;
    holders: number | null;
    top10HolderPercent: number | null;
    devWalletPercent: number | null;
    riskScore: number;
    verdict: "BLESSED" | "SUSPICIOUS" | "CURSED" | "UNKNOWN";
    cultAnalysis: string | null;
    redFlags: string[];
    greenFlags: string[];
    isRugRisk: boolean | null;
    gmgnUrl: string | null;
    scannedAt: string;
}>;
export declare const oracleRequestSchema: z.ZodObject<{
    question: z.ZodString;
    context: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    question: string;
    context?: string | undefined;
}, {
    question: string;
    context?: string | undefined;
}>;
export declare const oracleResponseSchema: z.ZodObject<{
    answer: z.ZodString;
    ritual: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    answer: string;
    ritual: string | null;
}, {
    answer: string;
    ritual: string | null;
}>;
export declare const proposalSchema: z.ZodObject<{
    id: z.ZodNumber;
    title: z.ZodString;
    description: z.ZodString;
    proposer: z.ZodString;
    status: z.ZodEnum<["ACTIVE", "PASSED", "REJECTED", "PENDING"]>;
    votesFor: z.ZodNumber;
    votesAgainst: z.ZodNumber;
    votesAbstain: z.ZodNumber;
    category: z.ZodEnum<["GENERAL", "TREASURY", "PROTOCOL", "RITUAL", "ALLIANCE", "PURGE"]>;
    endDate: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "ACTIVE" | "PASSED" | "REJECTED" | "PENDING";
    id: number;
    title: string;
    description: string;
    proposer: string;
    votesFor: number;
    votesAgainst: number;
    votesAbstain: number;
    category: "GENERAL" | "TREASURY" | "PROTOCOL" | "RITUAL" | "ALLIANCE" | "PURGE";
    endDate: string | null;
    createdAt: string;
}, {
    status: "ACTIVE" | "PASSED" | "REJECTED" | "PENDING";
    id: number;
    title: string;
    description: string;
    proposer: string;
    votesFor: number;
    votesAgainst: number;
    votesAbstain: number;
    category: "GENERAL" | "TREASURY" | "PROTOCOL" | "RITUAL" | "ALLIANCE" | "PURGE";
    endDate: string | null;
    createdAt: string;
}>;
export declare const createProposalRequestSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    category: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    category?: string | undefined;
}, {
    title: string;
    description: string;
    category?: string | undefined;
}>;
export declare const voteRequestSchema: z.ZodObject<{
    vote: z.ZodEnum<["FOR", "AGAINST", "ABSTAIN"]>;
    voter: z.ZodString;
}, "strip", z.ZodTypeAny, {
    vote: "FOR" | "AGAINST" | "ABSTAIN";
    voter: string;
}, {
    vote: "FOR" | "AGAINST" | "ABSTAIN";
    voter: string;
}>;
export declare const daoSummarySchema: z.ZodObject<{
    totalProposals: z.ZodNumber;
    activeProposals: z.ZodNumber;
    totalMembers: z.ZodNumber;
    totalVotes: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    totalProposals: number;
    activeProposals: number;
    totalMembers: number;
    totalVotes: number;
}, {
    totalProposals: number;
    activeProposals: number;
    totalMembers: number;
    totalVotes: number;
}>;
export declare const memberSchema: z.ZodObject<{
    id: z.ZodNumber;
    username: z.ZodString;
    walletAddress: z.ZodNullable<z.ZodString>;
    rank: z.ZodEnum<["INITIATE", "ACOLYTE", "DISCIPLE", "HIGH_PRIEST", "GRAND_MASTER"]>;
    xp: z.ZodNumber;
    oath: z.ZodNullable<z.ZodString>;
    scansPerformed: z.ZodNumber;
    proposalsCreated: z.ZodNumber;
    votesCast: z.ZodNumber;
    joinedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    walletAddress: string | null;
    id: number;
    username: string;
    rank: "INITIATE" | "ACOLYTE" | "DISCIPLE" | "HIGH_PRIEST" | "GRAND_MASTER";
    xp: number;
    oath: string | null;
    scansPerformed: number;
    proposalsCreated: number;
    votesCast: number;
    joinedAt: string;
}, {
    walletAddress: string | null;
    id: number;
    username: string;
    rank: "INITIATE" | "ACOLYTE" | "DISCIPLE" | "HIGH_PRIEST" | "GRAND_MASTER";
    xp: number;
    oath: string | null;
    scansPerformed: number;
    proposalsCreated: number;
    votesCast: number;
    joinedAt: string;
}>;
export declare const joinRequestSchema: z.ZodObject<{
    username: z.ZodString;
    walletAddress: z.ZodOptional<z.ZodString>;
    oath: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    username: string;
    walletAddress?: string | undefined;
    oath?: string | undefined;
}, {
    username: string;
    walletAddress?: string | undefined;
    oath?: string | undefined;
}>;
export declare const leaderboardEntrySchema: z.ZodObject<{
    username: z.ZodString;
    xp: z.ZodNumber;
    rank: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    rank: string;
    xp: number;
}, {
    username: string;
    rank: string;
    xp: number;
}>;
export declare const prophecySchema: z.ZodObject<{
    id: z.ZodNumber;
    tokenName: z.ZodString;
    tokenSymbol: z.ZodString;
    ca: z.ZodNullable<z.ZodString>;
    prophecyText: z.ZodString;
    signal: z.ZodEnum<["ASCEND", "DESCEND", "CHAOS", "STAGNANT"]>;
    priceTarget: z.ZodNullable<z.ZodNumber>;
    confidence: z.ZodNullable<z.ZodNumber>;
    source: z.ZodNullable<z.ZodString>;
    isFulfilled: z.ZodBoolean;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    ca: string | null;
    id: number;
    createdAt: string;
    tokenName: string;
    tokenSymbol: string;
    prophecyText: string;
    signal: "ASCEND" | "DESCEND" | "CHAOS" | "STAGNANT";
    priceTarget: number | null;
    confidence: number | null;
    source: string | null;
    isFulfilled: boolean;
}, {
    ca: string | null;
    id: number;
    createdAt: string;
    tokenName: string;
    tokenSymbol: string;
    prophecyText: string;
    signal: "ASCEND" | "DESCEND" | "CHAOS" | "STAGNANT";
    priceTarget: number | null;
    confidence: number | null;
    source: string | null;
    isFulfilled: boolean;
}>;
export declare const signalSchema: z.ZodObject<{
    id: z.ZodNumber;
    title: z.ZodString;
    content: z.ZodString;
    author: z.ZodString;
    category: z.ZodEnum<["ALPHA", "WARNING", "RITUAL", "REVELATION", "PROPHECY"]>;
    tags: z.ZodArray<z.ZodString, "many">;
    relatedCa: z.ZodNullable<z.ZodString>;
    isPinned: z.ZodBoolean;
    upvotes: z.ZodNumber;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: number;
    title: string;
    category: "RITUAL" | "ALPHA" | "WARNING" | "REVELATION" | "PROPHECY";
    createdAt: string;
    content: string;
    author: string;
    tags: string[];
    relatedCa: string | null;
    isPinned: boolean;
    upvotes: number;
}, {
    id: number;
    title: string;
    category: "RITUAL" | "ALPHA" | "WARNING" | "REVELATION" | "PROPHECY";
    createdAt: string;
    content: string;
    author: string;
    tags: string[];
    relatedCa: string | null;
    isPinned: boolean;
    upvotes: number;
}>;
export declare const postSignalRequestSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    category: z.ZodString;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relatedCa: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    category: string;
    content: string;
    tags?: string[] | undefined;
    relatedCa?: string | undefined;
}, {
    title: string;
    category: string;
    content: string;
    tags?: string[] | undefined;
    relatedCa?: string | undefined;
}>;
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
//# sourceMappingURL=index.d.ts.map