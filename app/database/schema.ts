import { serial, pgTable, text, timestamp, numeric, integer, char, pgEnum } from 'drizzle-orm/pg-core';

export const ai_calls = pgTable('ai_calls', {
  id: serial('id').primaryKey(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const statusEnum = pgEnum('status', ['open', 'covered', 'cancelled', 'delivered']);

export const loads = pgTable('loads', {
  // NOTE: The default for load_id (e.g., 'HH-00001') must be set in the migration SQL using a sequence and to_char.
  load_id: text('load_id').primaryKey(),
  origin: text('origin').notNull(),
  destination: text('destination').notNull(),
  pickup_datetime: timestamp('pickup_datetime', { withTimezone: true }).notNull(),
  delivery_datetime: timestamp('delivery_datetime', { withTimezone: true }).notNull(),
  equipment_type: text('equipment_type').notNull(),
  loadboard_rate: numeric('loadboard_rate', { precision: 10, scale: 2 }).notNull(),
  finalized_rate: integer('finalized_rate'),
  notes: text('notes'),
  weight: integer('weight'),
  commodity_type: text('commodity_type'),
  num_of_pieces: integer('num_of_pieces'),
  miles: integer('miles'),
  dimensions: text('dimensions'),
  status: statusEnum('status').notNull().default('open'),
  carrier_mc_number: text('carrier_mc_number'),
  carrier_name: text('carrier_name'),
  dba_name: text('dba_name'),
  carrier_street: text('carrier_street'),
  carrier_city: text('carrier_city'),
  carrier_state: char('carrier_state', { length: 2 }),
  carrier_zip: text('carrier_zip'),
  carrier_country: text('carrier_country'),
});
