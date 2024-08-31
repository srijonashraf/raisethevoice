import { useState } from 'react';

type validateFormArgs = {
  data: any;
  schema: any;
  onError?: any;
  onOk: any;
};

export default function useErrors() {
  const [errors, _setErrors] = useState<any>({});

  const setErrors = (error?: any) => {
    if (error) {
      _setErrors((prevState: any) => ({ ...prevState, ...error }));
    } else {
      _setErrors({});
    }
  };

  const clearError = (key?: any) => {
    if (key) {
      setErrors({ [key]: null });
    } else {
      setErrors(null);
    }
  };

  const validateForm = async ({
    data,
    onError,
    onOk,
    schema,
  }: validateFormArgs) => {
    const _onError = onError ?? setErrors;

    try {
      const resp = await schema.validate(data, { abortEarly: false });
      onOk(resp);
    } catch (error: any) {
      const validationErrors: any = {};
      error.inner.forEach((err: any) => {
        validationErrors[err.path] = err.message;
      });
      _onError(validationErrors);
    }
  };

  return { errors, setErrors, clearError, validateForm };
}
