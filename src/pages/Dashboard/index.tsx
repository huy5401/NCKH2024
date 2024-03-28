import React, { useEffect, useState } from "react";
import DashboardChart from "./component/DashboardChart";
import './style.scss'
import { useDispatch } from "react-redux";
import { setSelectedBreadCrumb } from "../App/store/appSlice";
import DashboardGeneralItem from "./component/DashboardGeneralItem";
import { Space, Spin, message } from "antd";
import Icons from "../../assets/icons";
import DboardTopCardItem from "./component/DboardTopCardItem";
import { useLog, useTopRuleHit } from "../../utils/request";
import { statisticApi } from "../../apis/statistic";

const Dashboard = () => {
  const dispatch = useDispatch();
  //const {data:dataTopRule, isLoading, error, mutate} = useTopRuleHit();
  const [dataTopRule, setDataTopRule] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetcher = async () => {
    setIsLoading(true);
    try {
      const res = await statisticApi.getTopRuleHit();
      if (res.status === 200) {
        setDataTopRule(res.data);        
      } else message.error("Error get top rule");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      message.error("Error get top rule");
    }
  }
  useEffect(() => {
    fetcher();
  }, [])
  useEffect(() => {
    let breadCrumb = [
      {
        label: "Dashboard",
        path: "",
      }
    ]
    dispatch(setSelectedBreadCrumb(breadCrumb))
  }, [])

  return (
    <div className="customers-wrapper">
      <Spin spinning={isLoading}>
        <Space direction="horizontal" className="dasboard-gn-wrapper">
          <DashboardGeneralItem title="Số service" value={12} icon={<Icons.bell />} />
        </Space>
        <DashboardChart />
        <Space direction="horizontal" className="dasboard-gn-wrapper" style={{ marginTop: 10 }}>
          <DboardTopCardItem title="Top vulnerabilities" value={['XSS', 'SQL Injection', 'File Upload']} icon={<Icons.file />} />
          <DboardTopCardItem title="Top rules" value={dataTopRule?.map((item: any) => item.rule_id).slice(-3)} icon={<Icons.camera />} />
        </Space>
      </Spin>

    </div>
  );
};

export default Dashboard;
