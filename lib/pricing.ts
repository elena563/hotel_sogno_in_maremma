import { differenceInCalendarDays } from "date-fns";

import { Room } from "./data/rooms";

export type Board = "bb" | "half_board" | "full_board";

export const BOARD_CONFIG = {
  bb: {
    supplementPerAdultPerNight: 0,
    supplementPerChildPerNight: 0,
  },
  half_board: {
    supplementPerAdultPerNight: 20,
    supplementPerChildPerNight: 10,
  },
  full_board: {
    supplementPerAdultPerNight: 35,
    supplementPerChildPerNight: 20,
  },
} satisfies Record<Board, {
  supplementPerAdultPerNight: number;
  supplementPerChildPerNight: number;
}>;

export type Season = "low" | "middle" | "high";

export const SEASON_CONFIG = {
  low: {
    percentage: 0,
  },
  middle: {
    percentage: 0.1,
  },
  high: {
    percentage: 0.2,
  },
} satisfies Record<Season, {
  percentage: number;
}>;





function calculateSeason(checkIn: Date, checkOut: Date): Season {
  const checkInTime = checkIn.getTime();
  const checkOutTime = checkOut.getTime();
  const midpoint = new Date((checkInTime + checkOutTime) / 2);

  const month = midpoint.getMonth() + 1; //getmonth outputs 0-11
  const day = midpoint.getDate();

  if (month === 7 || month === 8) {
    return "high";
  } else if ((month === 6 && day >= 15) || (month === 9 && day < 15)) {
    return "middle";
  } else {
    return "low";
  }
}

// 1 get input data from the form

// 2 validate the input data

// 3 check available options for input data

// 4 calculate the total price based on input data and available options
export function calculateTotalPrice(
    room: Room,  
    nAdults: number, 
    nChildren: number, 
    board: Board,
    checkIn: Date,
    checkOut: Date
    ): number {
  const boardConfig = BOARD_CONFIG[board];
  const nNights = differenceInCalendarDays(checkOut, checkIn);
  
  const roomPrice = room.basePrice * nNights;
  const boardPrice = boardConfig.supplementPerAdultPerNight * nAdults * nNights + boardConfig.supplementPerChildPerNight * nChildren * nNights;

  const season = calculateSeason(checkIn, checkOut);
  const seasonConfig = SEASON_CONFIG[season];
  const seasonSupplement = (roomPrice + boardPrice) * seasonConfig.percentage;
  const price =  roomPrice + boardPrice + seasonSupplement;
  return price;
}
