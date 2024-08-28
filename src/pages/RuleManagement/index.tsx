import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RULE_MANAGEMENT } from "../../routes/route.constant";
import { setSelectedBreadCrumb } from "../App/store/appSlice";
import RuleCustomManagement from "./RuleCustomManagement";
import CRSManagement from "./CRSManagement";
import { Spin, Tabs } from "antd";
import './style.scss'
const RuleManagement = () => {
  const [filter, setFilter] = useState<any>({})
  const dispatch = useDispatch();
  useEffect(() => {
    let breadCrumb = [
      {
        label: "Rule management",
        path: ""
      }
    ]
    dispatch(setSelectedBreadCrumb(breadCrumb))
  }, [RULE_MANAGEMENT])

  const items = [{
    label: "CRS Management",
    key: "CRSManagement",
    children: <CRSManagement />,
  },
  {
    label: "Custom Rule Management",
    key: "ruleCusMng",
    children: <RuleCustomManagement />,
  },]
  return (
    <div className="container-wrapper">
      <Spin spinning={false}>
        <Tabs items={items} className="userManagementDetailsTab" />
      </Spin>
    </div>
  );
};

export default RuleManagement;
