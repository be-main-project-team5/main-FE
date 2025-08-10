import DateInput from './DateInput';
import DefaultInput from './DefaultInput';
import PasswordInput from './PasswordInput';
import TextArea from './TextArea';
import TimeInput from './TimeInput';
import type { InputProps, FieldTypes, TextAreaProps } from './input.types';

const InputMap: Record<FieldTypes, React.ComponentType<any>> = {
  text: DefaultInput,
  email: DefaultInput,
  password: PasswordInput,
  date: DateInput,
  time: TimeInput,
  textarea: TextArea,
};

type FieldProps = InputProps | TextAreaProps;

export default function Input({ type = 'text', ...props }: FieldProps) {
  const Component = InputMap[type];
  return <Component {...props} />;
}
