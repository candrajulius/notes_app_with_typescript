
"use client";

import { Form, Button, Typography, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import FormInput from "../component/FormInput";
import FormInputPassword from "../component/FormInputPassword";
import AuthFooterText from "../component/AuthFooterText";
import { register } from "../utils/network_data";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {

  const router = useRouter();

  const onFinish = async (values: RegisterFormValues) => {
    const result = await register(values);
     if (result.error) {
      message.error(result.message || "Registration failed!");
      return;
    }

  
    message.success("Registration successful! Please login.");
    router.push("/login");
  }

   return (
    <div className="flex min-h-screen">
      {/* LEFT SIDE */}
      <div className="relative hidden w-1/2 items-center justify-center bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 md:flex">
        <div className="flex flex-col items-center text-white">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white">
            <span className="text-4xl font-bold">N</span>
          </div>
          <h1 className="text-3xl font-semibold">Notes.</h1>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full items-center justify-center bg-white md:w-1/2">
        <div className="w-full max-w-md px-8">
          <Title level={2} className="!mb-2 !text-pink-500">
            Get started!
          </Title>
          <Text type="secondary">
            Create your account now
          </Text>

          <Form
            layout="vertical"
            className="mt-8"
            onFinish={onFinish}
          >
            {/* USERNAME */}
            <FormInput name="name" label="Name" placeholder="Enter your name" rules={[{ required: true, message: "Name wajib diisi" }]} prefix={<UserOutlined />} />

            {/* USERNAME */}
            <FormInput name="email" label="Email" placeholder="Enter your email" rules={[{ required: true, message: "Email wajib diisi" },{type: 'email', message: 'Email tidak valid'}]} prefix={<MailOutlined />} />

            {/* PASSWORD */}
            <FormInputPassword name="password" label="Password" placeholder="Enter your password" rules={[{ required: true, message: "Password wajib diisi" }, {min: 8, message: "Password minimal 8 karakter"}]} prefix={<LockOutlined />} />

            {/* BUTTON */}
            <Form.Item>
             <Button
                type="default"
                htmlType="submit"
                size="large"
                className="
                  w-full
                  rounded-full
                  !border-black
                  !border
                  bg-pink-500
                  text-white
                  transition
                  active:!bg-pink-600
                  hover:!bg-pink-600
                  focus-visible:!bg-pink-600
                  hover:!text-black active:!text-black focus-visible:!text-black
                "
              >
                Register
              </Button>
            </Form.Item>

            {/* SIGN UP */}
            <AuthFooterText prompt="Already have an account?" actionText="Sign in" actionLink="/login"/>
          </Form>
        </div>
      </div>
    </div>
  );
}