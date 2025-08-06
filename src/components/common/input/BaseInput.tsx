import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const inputStyles = cva(
  'w-full rounded-[10px] border border-solid border-gray-200 bg-white text-sm font-normal placeholder:text-gray-500 focus:outline-none',
  {
    variants: {
      intent: {
        default: 'p-3',
        hasIcon: 'pt-3 pr-11 pb-3 pl-3',
      },
    },
    defaultVariants: {
      intent: 'default',
    },
  },
);

type InputType = 'text' | 'email' | 'date' | 'time' | 'password';

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  type?: InputType;
};

function BaseInput({ type = 'text', placeholder }: InputProps) {
  const intent = ['date', 'time', 'password'].includes(type)
    ? 'hasIcon'
    : 'default';

  const classes = clsx(inputStyles({ intent }));

  return <input type={type} placeholder={placeholder} className={classes} />;
}

export default BaseInput;
