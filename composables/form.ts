import { cloneDeep } from "lodash-es";
import type { FormInstance } from "element-plus";

export const useDefaultRef = <T>(initialValue: T) => {
  const defaultData: any = cloneDeep(initialValue);
  const data = ref(initialValue);
  return Object.assign(data, {
    reset: () => (data.value = cloneDeep(defaultData)),
  });
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
