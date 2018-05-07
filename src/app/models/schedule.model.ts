import { duration } from "moment";

export interface Schedule {
  key?: string,
  type: string,
  slots: Slots,
  description?: string
}

export interface Slots {
  start: string,
  end: string,
  duration: number
}

export interface SlotFormatted {
  from: string,
  to: string
}

