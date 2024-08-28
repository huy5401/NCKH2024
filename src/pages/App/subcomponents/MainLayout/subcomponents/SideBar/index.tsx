import React from "react";
import { Menu, Row, Space, Typography } from "antd";
import type { MenuProps } from "antd";
import { ApartmentOutlined, SettingFilled, AppstoreFilled, LockFilled, FileTextOutlined, FileDoneOutlined } from "@ant-design/icons";
import {
  CUSTOMER,
  ACCOUNT,
  SETTING,
  DASHBOARD,
  LOG,
  RULE,
  USER_MANAGEMENT,
  RULE_MANAGEMENT,
  LIST_BLOCK_IP,
  HISTORY_PROTECT,
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
  getItem(<Link to={USER_MANAGEMENT}>Website Management</Link>, '2', <ApartmentOutlined />),
  getItem(<Link to={HISTORY_PROTECT}>History Protect</Link>, '3', <FileDoneOutlined />),
  getItem(<Link to={RULE_MANAGEMENT}>Rule Management</Link>, '4', <LockFilled />),
  getItem(<Link to={LIST_BLOCK_IP}>List Blocked IP</Link>, '5', <FileTextOutlined />),
  getItem(<Link to={SETTING}>Setting</Link>, '6', <SettingFilled />),
];
export const SideBar: React.FC = () => {
  return (
    <div className="sideBar-container">
      <Space direction="vertical">
        <div className="sider-title-wrapper">
          <Typography className="slide-tittle">WAF Manager</Typography>
        </div>
        <Row className="w-100 menuTab">
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['1']}
            inlineIndent={10}
            items={items}
            mode="inline"
          />
        </Row>
      </Space>
    </div >
  );
};
