import { Time } from "@/types";

export const getHours = (date: Date | undefined, times: Time) => {
  if (!date) return [];

  const key = date?.toISOString().split("T")[0];
  return times[key] || [];
}

export const getDisabledDates = (date: Date | undefined, times: Time) => {
  if(!date) return true;

  if(date <= new Date()) {
    return true;
  }

  const key = date.toISOString().split("T")[0];

  return !times[key];
}

export const getTomorrow = () => {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  today.setHours(0, 0, 0, 0);
  return today;
};
