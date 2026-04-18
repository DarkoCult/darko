"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signals = exports.prophecies = exports.proposals = exports.members = exports.oracleQueries = exports.scanRecords = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.scanRecords = (0, pg_core_1.pgTable)('scan_records', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    ca: (0, pg_core_1.varchar)('ca').notNull(),
    name: (0, pg_core_1.varchar)('name'),
    symbol: (0, pg_core_1.varchar)('symbol'),
    price: (0, pg_core_1.numeric)('price'),
    priceChange24h: (0, pg_core_1.numeric)('price_change_24h'),
    marketCap: (0, pg_core_1.numeric)('market_cap'),
    volume24h: (0, pg_core_1.numeric)('volume_24h'),
    liquidity: (0, pg_core_1.numeric)('liquidity'),
    holders: (0, pg_core_1.integer)('holders'),
    top10HolderPercent: (0, pg_core_1.numeric)('top10_holder_percent'),
    devWalletPercent: (0, pg_core_1.numeric)('dev_wallet_percent'),
    riskScore: (0, pg_core_1.integer)('risk_score').notNull(),
    verdict: (0, pg_core_1.varchar)('verdict').notNull(),
    cultAnalysis: (0, pg_core_1.text)('cult_analysis'),
    redFlags: (0, pg_core_1.jsonb)('red_flags'),
    greenFlags: (0, pg_core_1.jsonb)('green_flags'),
    isRugRisk: (0, pg_core_1.boolean)('is_rug_risk'),
    gmgnUrl: (0, pg_core_1.varchar)('gmgn_url'),
    scannedAt: (0, pg_core_1.timestamp)('scanned_at').defaultNow(),
});
exports.oracleQueries = (0, pg_core_1.pgTable)('oracle_queries', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    question: (0, pg_core_1.text)('question').notNull(),
    answer: (0, pg_core_1.text)('answer').notNull(),
    ritual: (0, pg_core_1.varchar)('ritual'),
    askedAt: (0, pg_core_1.timestamp)('asked_at').defaultNow(),
});
exports.members = (0, pg_core_1.pgTable)('members', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    username: (0, pg_core_1.varchar)('username').unique().notNull(),
    walletAddress: (0, pg_core_1.varchar)('wallet_address'),
    rank: (0, pg_core_1.varchar)('rank').default('INITIATE'),
    xp: (0, pg_core_1.integer)('xp').default(0),
    oath: (0, pg_core_1.text)('oath'),
    scansPerformed: (0, pg_core_1.integer)('scans_performed').default(0),
    proposalsCreated: (0, pg_core_1.integer)('proposals_created').default(0),
    votesCast: (0, pg_core_1.integer)('votes_cast').default(0),
    joinedAt: (0, pg_core_1.timestamp)('joined_at').defaultNow(),
});
exports.proposals = (0, pg_core_1.pgTable)('proposals', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    title: (0, pg_core_1.varchar)('title').notNull(),
    description: (0, pg_core_1.text)('description').notNull(),
    proposer: (0, pg_core_1.varchar)('proposer').notNull(),
    status: (0, pg_core_1.varchar)('status').default('ACTIVE'),
    votesFor: (0, pg_core_1.integer)('votes_for').default(0),
    votesAgainst: (0, pg_core_1.integer)('votes_against').default(0),
    votesAbstain: (0, pg_core_1.integer)('votes_abstain').default(0),
    category: (0, pg_core_1.varchar)('category').default('GENERAL'),
    endDate: (0, pg_core_1.timestamp)('end_date'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
exports.prophecies = (0, pg_core_1.pgTable)('prophecies', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    tokenName: (0, pg_core_1.varchar)('token_name').notNull(),
    tokenSymbol: (0, pg_core_1.varchar)('token_symbol').notNull(),
    ca: (0, pg_core_1.varchar)('ca'),
    prophecyText: (0, pg_core_1.text)('prophecy_text').notNull(),
    signal: (0, pg_core_1.varchar)('signal').notNull(),
    priceTarget: (0, pg_core_1.numeric)('price_target'),
    confidence: (0, pg_core_1.integer)('confidence'),
    source: (0, pg_core_1.varchar)('source'),
    isFulfilled: (0, pg_core_1.boolean)('is_fulfilled').default(false),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
exports.signals = (0, pg_core_1.pgTable)('signals', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    title: (0, pg_core_1.varchar)('title').notNull(),
    content: (0, pg_core_1.text)('content').notNull(),
    author: (0, pg_core_1.varchar)('author').notNull(),
    category: (0, pg_core_1.varchar)('category').notNull(),
    tags: (0, pg_core_1.jsonb)('tags').default([]),
    relatedCa: (0, pg_core_1.varchar)('related_ca'),
    isPinned: (0, pg_core_1.boolean)('is_pinned').default(false),
    upvotes: (0, pg_core_1.integer)('upvotes').default(0),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
//# sourceMappingURL=schema.js.map