const textAreaStyles =
  'peer h-fit w-full rounded-[10px] border border-solid border-gray-200 bg-white p-3 text-sm font-normal placeholder:text-gray-500 focus:outline-none resize-none';

type InputProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

function TextArea({ type = 'text', label, className, ...rest }: InputProps) {
  const intent = ['date', 'time', 'password'].includes(type)
    ? 'hasIcon'
    : 'default';

  return (
    <div className="relative flex h-[152px] items-end">
      <textarea rows={5} placeholder=" " className={textAreaStyles} {...rest} />
      <label className="font-sm absolute top-0 font-normal text-gray-500 transition-all duration-200 ease-out peer-placeholder-shown:top-9.25 peer-placeholder-shown:left-2.5 peer-focus:top-0 peer-focus:left-0">
        {label}
      </label>
    </div>
  );
}

export default TextArea;
