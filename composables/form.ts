import { cloneDeep } from "lodash-es";
import type { FormInstance } from "element-plus";
import { toValue } from "@vueuse/core";

export const useDefaultRef = <T>(initialValue: T) => {
  const defaultData = ref(cloneDeep(toValue(initialValue)));
  const data = Object.assign(ref(initialValue), {
    reset: () => (data.value = cloneDeep(defaultData.value)),
  });
  return data;
};

export const useForm = () => {
  const form = ref<FormInstance>();
  const validate = () =>
    new Promise<void>((resolve, reject) => {
      if (!form.value) return reject(new Error("form is not ready"));
      form.value.validate((valid: boolean) => {
        if (valid) return resolve();
        reject(new Error("form validation failed"));
      });
    });
  return { form, validate };
};
