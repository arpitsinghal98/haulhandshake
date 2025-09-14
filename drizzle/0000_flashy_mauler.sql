CREATE TYPE "public"."status" AS ENUM('open', 'covered', 'cancelled', 'delivered');--> statement-breakpoint
CREATE TABLE "loads" (
	"load_id" text PRIMARY KEY NOT NULL,
	"origin" text NOT NULL,
	"destination" text NOT NULL,
	"pickup_datetime" timestamp with time zone NOT NULL,
	"delivery_datetime" timestamp with time zone NOT NULL,
	"equipment_type" text NOT NULL,
	"loadboard_rate" numeric(10, 2) NOT NULL,
	"notes" text,
	"weight" integer,
	"commodity_type" text,
	"num_of_pieces" integer,
	"miles" integer,
	"dimensions" text,
	"status" "status" DEFAULT 'open' NOT NULL,
	"carrier_mc_number" text,
	"carrier_name" text,
	"dba_name" text,
	"carrier_street" text,
	"carrier_city" text,
	"carrier_state" char(2),
	"carrier_zip" text,
	"carrier_country" text
);

-- Add sequence and default for load_id
CREATE SEQUENCE IF NOT EXISTS load_id_seq START 1 MINVALUE 1;
ALTER TABLE "loads"
  ALTER COLUMN "load_id"
  SET DEFAULT ('HH-' || to_char(nextval('load_id_seq'), 'FM00000'));
