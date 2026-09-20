CREATE TYPE "board_type" AS ENUM('bb', 'half_board', 'full_board');--> statement-breakpoint
CREATE TYPE "booking_status" AS ENUM('pending', 'confirmed', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "room_type" AS ENUM('economy', 'comfort', 'deluxe', 'hottub');--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bookings_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"email" text NOT NULL,
	"checkIn" date NOT NULL,
	"checkOut" date NOT NULL,
	"adults" integer NOT NULL,
	"children" integer NOT NULL,
	"room" "room_type" NOT NULL,
	"price" integer NOT NULL,
	"board" "board_type" NOT NULL,
	"status" "booking_status" DEFAULT 'pending'::"booking_status" NOT NULL,
	"deleted" boolean DEFAULT false NOT NULL
);
