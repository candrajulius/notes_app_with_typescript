"use client";

import { Layout, Avatar, Dropdown, MenuProps, Button } from "antd";
import { LogoutOutlined, UserOutlined, PlusOutlined, GlobalOutlined, DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import ProfileModal from "../ProfileModal";

const { Header } = Layout;

type HeaderProps = {
  user: string;
  setOpen: () => void;
}

export default function AppHeader({user, setOpen}: HeaderProps ) {

  const [profileOpen, setProfileOpen] = useState(false);

  const menuItems: MenuProps["items"] = [
  {
    key: "profile",
    label: "Profile",
    icon: <UserOutlined />,
    onClick: () => setProfileOpen(true),
  },
];

  const itemsMenu: MenuProps["items"] = [
    {
      key: 'id',
      label: "Indonesia",
    },
    {
      key: 'en',
      label: "English"
    }
  ]

  return (
    <Header className="sticky top-0 z-50 flex items-center justify-between !bg-white !px-6 shadow-sm">
      {/* LOGO */}
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold text-gray-800">
          Notes App
        </span>
        <Button type="primary" icon={<PlusOutlined />} onClick={setOpen}/>
      </div>

      <div className="flex items-center gap-5">
        {/* AVATAR */}
        <Dropdown menu={{ items: menuItems }} placement="bottomRight">
          <div className="flex cursor-pointer items-center gap-2">
            <span className="text-sm text-gray-600">{user}</span>
            <Avatar icon={<UserOutlined />}/>
          </div>
        </Dropdown>
        <Dropdown menu={{ items: itemsMenu }} trigger={['click']}>
          <Button icon={<GlobalOutlined />} />
        </Dropdown>

      </div>

     

      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
    </Header>
  );
}