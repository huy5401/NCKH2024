import React from "react";
import "./style.scss";
import LoginForm from "./subcomponents/LoginForm";
import { Space } from "antd";
import IconModel from "./subcomponents/IconModel";
import { StatisticTabSVG, WordReportTypeSVG, SeeSampleSVG } from "../../assets/images";
import Icon from "@ant-design/icons";

const Login = () => {
  return (
    <div className="login-wrapper">
      <LoginForm />
    </div>
  );
};

export default Login;
