import { Input, Form } from "antd";
import { Rule } from "antd/es/form";

interface FormInputProps {
    name: string;
    label: string;
    placeholder?: string;
    rules?: Rule[];
    prefix?: React.ReactNode;
    size?: "small" | "middle" | "large";
}

const FormInput = ({
  name, label, placeholder,rules,prefix,size = "large"
}: FormInputProps) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
    >
      <Input placeholder={placeholder} size={size} prefix={prefix} />
    </Form.Item>
  );
}

export default FormInput;
