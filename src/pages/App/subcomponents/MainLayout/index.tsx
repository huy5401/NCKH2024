import React, { useEffect } from "react";
import { Layout, message } from "antd";
import { SideBar } from "./subcomponents/SideBar";
import HeaderLayout from "./subcomponents/HeaderLayout";
import { Outlet, useNavigate } from "react-router-dom";
import "./style.scss";
import { LOGIN } from "../../../../routes/route.constant";
import Sider from "antd/es/layout/Sider";

const MainLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    handleCheckLogged();
  }, []);

  const handleCheckLogged = () => {
    if (!localStorage.getItem('access_token')) {
      navigate(LOGIN);
      message.warning("Vui lòng đăng nhập!");
    }
  };

  return (
    <>
      <Layout className="layout-container">
        <Sider width={240} className="mobileHidden sider-container">
          <SideBar />
        </Sider>
        <Layout className="layout-content">
          <div style={{position: "fixed", zIndex: 1, width: "100%"}}>
            <HeaderLayout />
          </div>
          <Outlet />
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
