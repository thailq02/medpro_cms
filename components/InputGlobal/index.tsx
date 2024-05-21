import {
  Input,
  InputNumber,
  InputNumberProps,
  InputProps,
  TextAreaProps,
} from "formik-antd";

export function InputGlobal(props: InputProps): JSX.Element {
  return <Input {...props} key={props.name} autoFocus />;
}

export function InputNumberGlobal(props: InputNumberProps): JSX.Element {
  return (
    <InputNumber
      key={props.name}
      className="w-full"
      min={0}
      type="number"
      autoFocus
      {...props}
    />
  );
}

export function TextAreaGlobal(props: TextAreaProps): JSX.Element {
  return (
    <Input.TextArea
      {...props}
      key={props.name}
      autoSize={{minRows: 3, maxRows: 5}}
    />
  );
}
