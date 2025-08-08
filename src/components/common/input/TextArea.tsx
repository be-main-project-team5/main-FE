import { defaultFieldStyle, labelStyle } from './input.styles';
import type { TextAreaProps } from './input.types';

function TextArea({ label, className, ...rest }: TextAreaProps) {
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
