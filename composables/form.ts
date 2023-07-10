import type { FormInstance } from "element-plus";

export const useForm = () => {
  const form = ref<FormInstance>();
  const validate = async () => {
    if (!form.value) throw new Error("form is not ready");
    await form.value.validate();
  };

  return { form, validate };
};
