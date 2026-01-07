"use client";

import { Form, Button, Typography, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import FormInput from "../component/FormInput";
import FormInputPassword from "../component/FormInputPassword";
import { login, putAccessToken } from "../utils/network_data";
import Link from "next/link";
import { useActionRouter } from "../hooks/useActionRouter";

const { Title, Text } = Typography;

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {

  const {onSuccess} = useActionRouter();

  const onFinish = async (values: LoginFormValues) => {
    const result = await login(values);
    if(result.error)
    {
      message.error(result.message || "Login failed!");
      return;
    }

    const token = result.data?.accessToken;

    if(token)
    {
      putAccessToken(token)
      document.cookie = `access_token=${token}; path=/;`;
    }
    onSuccess({successMessage: result.message, redirectTo: "/notes"});
  };

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
            Login Now To Notes  APP
          </Text>

          <Form
            layout="vertical"
            className="mt-8"
            onFinish={onFinish}
            // onFinish={onFinish}
          >
            {/* USERNAME */}
            <FormInput name="email" label="Email" placeholder="Enter your email" rules={[{ required: true, message: "Email wajib diisi" },{type: 'email', message: 'Email tidak valid'}]} prefix={<UserOutlined />} />

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
                Login
              </Button>
            </Form.Item>

            {/* SIGN UP */}
            <div className="text-center">
              <Text type="secondary">
                Don’t have an account?
              </Text>{" "}
              <Link href="/register" className="font-medium text-pink-500 hover:underline">
                Sign up
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
