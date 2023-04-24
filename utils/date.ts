import { formatDistanceToNowStrict, parseJSON } from "date-fns/esm";
import { zhCN } from "date-fns/esm/locale";

export const formatTime = (time: string) =>
  formatDistanceToNowStrict(parseJSON(time), {
    addSuffix: true,
    locale: zhCN,
  });
