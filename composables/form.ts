import { cloneDeep } from "lodash-es";

export const useDefaultRef = <T>(initialValue: T) => {
  const defaultData: any = cloneDeep(initialValue);
  const data = ref(initialValue);
  return Object.assign(data, {
    reset: () => (data.value = cloneDeep(defaultData)),
  });
};
