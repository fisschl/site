import {
  differenceInDays,
  formatDistanceToNowStrict,
  parseJSON,
} from "date-fns/esm";
import { zhCN } from "date-fns/esm/locale";

export const formatShowTime = (time: string) => {
  const date = parseJSON(time);
  const diff = differenceInDays(new Date(), date);
  if (diff > 1) {
    return date.toLocaleString();
  }
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: zhCN,
  });
};
