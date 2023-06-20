import { cloneDeep } from "lodash-es";
import type { FormInstance } from "element-plus";
import { toValue } from "@vueuse/core";

export const useDefaultRef = <T>(initialValue: T) => {
  const defaultData = ref(cloneDeep(toValue(initialValue)));
  const data = ref(initialValue);
  const reset = () => {
    data.value = cloneDeep(defaultData.value);
  };
  return { data, reset };
};

export const useForm = () => {
  const form = ref<FormInstance>();
  const validate = async () => {
    if (!form.value) throw new Error("form is not ready");
    await form.value.validate();
  };

  return { form, validate };
};
