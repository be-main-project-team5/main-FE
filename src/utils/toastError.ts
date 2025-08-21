import { type FieldErrors } from 'react-hook-form';
import { toast } from 'react-toastify';

export const toastFormErrors = <T extends Record<string, any>>(
  errors: FieldErrors<T>,
) => {
  Object.values(errors).forEach((error: any) => {
    if (error && error.message) {
      toast.error(error.message, {
        autoClose: 4000,
        hideProgressBar: false,
        position: 'top-right',
        closeOnClick: true,
        theme: 'light',
      });
    }
  });
};
