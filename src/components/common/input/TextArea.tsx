import { defaultFieldStyle, labelStyle } from './InputStyles';

type InputProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

function TextArea({ type = 'text', label, className, ...rest }: InputProps) {
  return (
    <div className="relative flex h-[152px] items-end">
      <textarea
        rows={5}
        placeholder=" "
        className={defaultFieldStyle}
        {...rest}
      />
      <label className={labelStyle}>{label}</label>
    </div>
  );
}

export default TextArea;
