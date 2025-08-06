import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import { defaultFieldStyle, labelStyle } from './InputStyles';

const inputStyles = cva(`${defaultFieldStyle}`, {
  variants: {
    intent: {
      default: 'p-3',
      hasIcon: 'pt-3 pr-11 pb-3 pl-3',
    },
  },
  defaultVariants: {
    intent: 'default',
  },
});

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
      <label className={labelStyle}>{label}</label>
    </div>
  );
}

export default DefaultInput;
