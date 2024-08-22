import React, { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { HISTORY_PROTECT, RULE_MANAGEMENT } from "../../routes/route.constant";
import { setSelectedBreadCrumb } from "../App/store/appSlice";
import HistoryProtectFilter from "./HistoryProtectFilter";
import HistoryProtectTable from "./HistoryProtectTable";
import { AttackedAllMap } from "./AttackedAllMap";
import { Spin, Tabs } from "antd";

const ListBlockIP = () => {
  const [filter, setFilter] = useState<any>({ time: 24 })
  const dispatch = useDispatch();
  useEffect(() => {
    let breadCrumb = [
      {
        label: "History Protect",
        path: ""
      }
    ]
    dispatch(setSelectedBreadCrumb(breadCrumb))
  }, [HISTORY_PROTECT])
  const items = [{
    label: "History Protected",
    key: "historyProtected",
    children: <>
      <div style={{ marginBottom: "12px" }}>
        <HistoryProtectFilter filters={filter} setFilters={setFilter} />
      </div>
      <HistoryProtectTable filter={filter} setFilter={setFilter} /></>,
  },
  {
    label: "Attacker Map",
    key: "attackerMap",
    children: <AttackedAllMap />,
  },]
  return (
    <div className="container-wrapper">
      <Spin spinning={false}>
        <Tabs items={items} className="userManagementDetailsTab" />
      </Spin>
    </div>
  );
};

export default ListBlockIP;
