import { pgTable, serial, varchar, numeric, integer, text, jsonb, timestamp, boolean } from 'drizzle-orm/pg-core';

export const scanRecords = pgTable('scan_records', {
  id: serial('id').primaryKey(),
  ca: varchar('ca').notNull(),
  name: varchar('name'),
  symbol: varchar('symbol'),
  price: numeric('price'),
  priceChange24h: numeric('price_change_24h'),
  marketCap: numeric('market_cap'),
  volume24h: numeric('volume_24h'),
  liquidity: numeric('liquidity'),
  holders: integer('holders'),
  top10HolderPercent: numeric('top10_holder_percent'),
  devWalletPercent: numeric('dev_wallet_percent'),
  riskScore: integer('risk_score').notNull(),
  verdict: varchar('verdict').notNull(),
  cultAnalysis: text('cult_analysis'),
  redFlags: jsonb('red_flags'),
  greenFlags: jsonb('green_flags'),
  isRugRisk: boolean('is_rug_risk'),
  gmgnUrl: varchar('gmgn_url'),
  scannedAt: timestamp('scanned_at').defaultNow(),
});

export const oracleQueries = pgTable('oracle_queries', {
  id: serial('id').primaryKey(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  ritual: varchar('ritual'),
  askedAt: timestamp('asked_at').defaultNow(),
});

export const members = pgTable('members', {
  id: serial('id').primaryKey(),
  username: varchar('username').unique().notNull(),
  walletAddress: varchar('wallet_address'),
  rank: varchar('rank').default('INITIATE'),
  xp: integer('xp').default(0),
  oath: text('oath'),
  scansPerformed: integer('scans_performed').default(0),
  proposalsCreated: integer('proposals_created').default(0),
  votesCast: integer('votes_cast').default(0),
  joinedAt: timestamp('joined_at').defaultNow(),
});

export const proposals = pgTable('proposals', {
  id: serial('id').primaryKey(),
  title: varchar('title').notNull(),
  description: text('description').notNull(),
  proposer: varchar('proposer').notNull(),
  status: varchar('status').default('ACTIVE'),
  votesFor: integer('votes_for').default(0),
  votesAgainst: integer('votes_against').default(0),
  votesAbstain: integer('votes_abstain').default(0),
  category: varchar('category').default('GENERAL'),
  endDate: timestamp('end_date'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const prophecies = pgTable('prophecies', {
  id: serial('id').primaryKey(),
  tokenName: varchar('token_name').notNull(),
  tokenSymbol: varchar('token_symbol').notNull(),
  ca: varchar('ca'),
  prophecyText: text('prophecy_text').notNull(),
  signal: varchar('signal').notNull(),
  priceTarget: numeric('price_target'),
  confidence: integer('confidence'),
  source: varchar('source'),
  isFulfilled: boolean('is_fulfilled').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const signals = pgTable('signals', {
  id: serial('id').primaryKey(),
  title: varchar('title').notNull(),
  content: text('content').notNull(),
  author: varchar('author').notNull(),
  category: varchar('category').notNull(),
  tags: jsonb('tags').default([]),
  relatedCa: varchar('related_ca'),
  isPinned: boolean('is_pinned').default(false),
  upvotes: integer('upvotes').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});