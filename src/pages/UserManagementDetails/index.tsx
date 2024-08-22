import React, { useEffect, useState } from "react";
import "./style.scss";
import { useLocation, useParams } from "react-router-dom";
import { Spin, Tabs, message } from "antd";
import Rules from "../Keys";
import { useDispatch } from "react-redux";
import { USER_MANAGEMENT, USER_MANAGEMENT_DETAILS } from "../../routes/route.constant";
import { setSelectedBreadCrumb } from "../App/store/appSlice";
import Logs from "./components/Logs";
import UserMnDashboard from "./components/UserMnDashboard";
import { AgentType } from "../../constants/types/agent.type";
import { agentApi } from "../../apis/agent";

const UserManagementDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    let breadCrumb = [
      {
        label: "Website managerment",
        path: USER_MANAGEMENT
      },
      {
        label: `${id}`,
        path: ""
      }
    ]
    dispatch(setSelectedBreadCrumb(breadCrumb));
  }, [USER_MANAGEMENT_DETAILS])
  // const location = useLocation();
  // const { agentDetails } = location.state;
  const [agentData, setAgentData] = useState<AgentType>({});
  const [isLoading, setIsLoading] = useState(false);
  const fetcher = async () => {
    setIsLoading(true);
    try {
      const res = await agentApi.getById(id);
      if (res.status === 200) {
        setAgentData(res.data);
      } else message.error("Get website details failed");
      setIsLoading(false);
    } catch (error) {
      message.error("Get website details failed");
      setIsLoading(false);
    }

  }
  useEffect(() => {
    fetcher();
  }, [])
  const items = [{
    label: "Statistic",
    key: "Statistic",
    children: <UserMnDashboard agentData={agentData} />,
  },
  {
    label: "Events",
    key: "Events",
    children: <Logs agentData={agentData} />,
  },
  {
    label: "Custom rules",
    key: "ruleCustom",
    children: <Rules agentData={agentData} />,
  }]

  return (
    <div className="container-wrapper">
      <Spin spinning={isLoading}>
        <Tabs items={items} className="userManagementDetailsTab" />
      </Spin>
    </div>
  );
};

export default UserManagementDetail;
