import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const inputStyles = cva(
  'w-full rounded-[10px] border border-solid border-gray-200 bg-white text-sm font-normal placeholder:text-gray-500 focus:outline-none',
  {
    variants: {
      intent: {
        default: 'p-3',
        hasIcon: 'pt-3 pr-8 pb-3 pl-3',
      },
    },
    defaultVariants: {
      intent: 'default',
    },
  },
);

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputStyles>;

function Input({ type = 'text', placeholder, intent, className }: InputProps) {
  const classes = clsx(inputStyles({ intent }), className);

  return <input type={type} placeholder={placeholder} className={classes} />;
}

export default Input;
