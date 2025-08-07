import { defaultFieldStyle, labelStyle } from './InputStyles';
import type { TextAreaProps } from './types';

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
