CREATE TYPE "season" AS ENUM('low', 'middle', 'high');--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "season" "season" NOT NULL;