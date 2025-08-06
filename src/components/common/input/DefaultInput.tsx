import { cva } from 'class-variance-authority';
import clsx from 'clsx';

const inputStyles = cva(
  'w-full h-fit rounded-[10px] border border-solid border-gray-200 bg-white text-sm font-normal placeholder:text-gray-500 focus:outline-none peer',
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

type InputType = 'text' | 'email' | 'password';

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  type?: InputType;
  label: string;
};

function DefaultInput({
  type = 'text',
  label,
  className,
  ...rest
}: InputProps) {
  const intent = ['date', 'time', 'password'].includes(type)
    ? 'hasIcon'
    : 'default';

  const classes = clsx(inputStyles({ intent }), className);

  return (
    <div className="relative flex h-18 items-end">
      <input type={type} placeholder=" " className={classes} {...rest} />
      <label className="font-sm absolute top-0 font-normal text-gray-500 transition-all duration-200 ease-out peer-placeholder-shown:top-9.25 peer-placeholder-shown:left-2.5 peer-focus:top-0 peer-focus:left-0">
        {label}
      </label>
    </div>
  );
}

export default DefaultInput;
