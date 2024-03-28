import React from "react";
import { Menu, Row, Space, Typography } from "antd";
import type { MenuProps } from "antd";
import { ApartmentOutlined, SettingFilled, AppstoreFilled, LockFilled, FileTextOutlined } from "@ant-design/icons";
import {
  CUSTOMER,
  ACCOUNT,
  SETTING,
  DASHBOARD,
  LOG,
  RULE,
  USER_MANAGEMENT,
} from "../../../../../../routes/route.constant";
import { Link } from "react-router-dom";

import "./style.scss";
import { useDispatch } from "react-redux";
import { changeActiveTab } from "../../../../store/appSlice";


type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to={DASHBOARD}>Dashboard</Link>, '1', <AppstoreFilled />,),
  // getItem('Management', '2', <ApartmentOutlined />, [
  //   getItem('Option 3', '3'),
  //   getItem('Option 4', '4'),
  // ]),
  getItem(<Link to={USER_MANAGEMENT}>Management</Link>, '2', <ApartmentOutlined />),
  // getItem(<Link to={RULE}>Rule</Link>, '5', <LockFilled />),
  // getItem(<Link to={LOG}>Logs</Link>, '6', <FileTextOutlined />),
  getItem(<Link to={SETTING}>Setting</Link>, '3', <SettingFilled />),
];
export const SideBar: React.FC = () => {
  return (
    <div className="sideBar-container">
      <Space direction="vertical" size={20}>
        <Row className="w-100 menuTab">
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            inlineIndent={10}
            items={items}
            mode="inline"
          />
        </Row>
      </Space>
    </div >
  );
};
