"use client";

import { Button, Checkbox, Form, Input, Typography  } from "antd";
const { Title, Text } = Typography;
import {
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";

export default function LoginPage() {
  return <div className="flex min-h-screen">
    {/* Left Section */}
    <div className="relative hidden w-1/2 items-center justify-center bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 md:flex">
        <div className="flex flex-col items-center text-white">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white">
            <span className="text-4xl font-bold">W</span>
          </div>
          <h1 className="text-3xl font-semibold">Wavy.</h1>
        </div>
       { /* RIGHT SIDE */}
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
            // onFinish={onFinish}
          >
            {/* USERNAME */}
            <Form.Item
              name="email"
              label="User name"
              rules={[
                { required: true, message: "Email wajib diisi" },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter your user name or email"
                prefix={<UserOutlined />}
              />
            </Form.Item>

            {/* PASSWORD */}
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Password wajib diisi" },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Enter your password"
                prefix={<LockOutlined />}
              />
            </Form.Item>

            {/* REMEMBER + FORGOT */}
            <div className="mb-4 flex items-center justify-between">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="text-sm text-pink-500 hover:underline">
                Forgot your password?
              </a>
            </div>

            {/* BUTTON */}
            <Form.Item>
              <Button
                htmlType="submit"
                size="large"
                className="w-full border-none bg-pink-500 text-white hover:!bg-pink-600"
              >
                Login
              </Button>
            </Form.Item>

            {/* SIGN UP */}
            <div className="text-center">
              <Text type="secondary">
                Don’t have an account?
              </Text>{" "}
              <a className="font-medium text-pink-500 hover:underline">
                Sign up
              </a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
}
