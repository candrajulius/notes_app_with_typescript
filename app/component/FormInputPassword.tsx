import { Input, Form } from "antd";
import { Rule } from "antd/es/form";

interface FormInputPasswordProps {
    name: string;
    label: string;
    placeholder?: string;
    rules?: Rule[];
    prefix?: React.ReactNode;
    size?: "small" | "middle" | "large";
}

const FormInputPassword = ({
  name, label, placeholder,rules,prefix,size = "large"
}: FormInputPasswordProps) => {
  return(
    <Form.Item
     name={name}
     label={label}
     rules={rules}
     >
      <Input.Password placeholder={placeholder} size={size} prefix={prefix} />
     </Form.Item>
  )
}

export default FormInputPassword;