import React from "react";
import {
  format,
  formatDistanceToNow,
  isBefore,
  subDays,
  subHours,
  subQuarters,
} from "date-fns";
type Props = { date: string };

const LastMessageTime: React.FC<Props> = ({ date }) => {
  const arrivedDate = new Date(date);
  if (isBefore(arrivedDate, subHours(new Date(), 23))) {
    if (isBefore(arrivedDate, subDays(new Date(), 1))) {
      if (isBefore(arrivedDate, subQuarters(new Date(), 2))) {
        return <span>{format(arrivedDate, "d MMM y")}</span>;
      }
      return <span>{format(arrivedDate, "d MMM")}</span>;
    }
    return <span>{format(arrivedDate, "H:mm ")}</span>;
  }
  return <span>{formatDistanceToNow(arrivedDate, { addSuffix: true })}</span>;
};

export default LastMessageTime;
