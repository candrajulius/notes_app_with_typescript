"use client";

import { Layout, Avatar, Dropdown, MenuProps, message } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { clearToken, putAccessToken } from "@/app/utils/network_data";
import { useActionRouter } from "@/app/hooks/useActionRouter";

const { Header } = Layout;

export default function AppHeader({user}: {user: string}) {

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const {onSuccess} = useActionRouter();

  const handleLogout = () => {
    clearToken();
    onSuccess({
      successMessage: "Logout successfull!",
      redirectTo: "/login",
    });
    
  }


  const menuItems: MenuProps["items"] = [
  {
    key: "profile",
    label: "Profile",
    icon: <UserOutlined />,
    onClick: () => setProfileOpen(true),
  },
  {
    key: "logout",
    danger: true,
    icon: <LogoutOutlined />,
    label: "Logout",
    onClick: () => handleLogout(),
  },
];

  return (
    <Header className="sticky top-0 z-50 flex items-center justify-between !bg-white !px-6 shadow-sm">
      {/* LOGO */}
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold text-gray-800">
          Notes App
        </span>
      </div>

      {/* AVATAR */}
      <Dropdown menu={{ items: menuItems }} placement="bottomRight">
        <div className="flex cursor-pointer items-center gap-2">
          <span className="text-sm text-gray-600">{user}</span>
          <Avatar icon={<UserOutlined />}/>
        </div>
      </Dropdown>
    </Header>
  );
}