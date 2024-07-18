import React, { useEffect, useState } from "react";
import DashboardChart from "./component/DashboardChart";
import './style.scss'
import { useDispatch } from "react-redux";
import { setSelectedBreadCrumb } from "../App/store/appSlice";
import DashboardGeneralItem from "./component/DashboardGeneralItem";
import { Space, Spin, message } from "antd";
import Icons from "../../assets/icons";
import DboardTopCardItem from "./component/DboardTopCardItem";
import { useAgent, useLog, useTopRuleHit } from "../../utils/request";
import { statisticApi } from "../../apis/statistic";
import { CommonGetAllParams } from "../../constants/types/common.type";
const Dashboard = () => {
  const dispatch = useDispatch();
  //const {data:dataTopRule, isLoading, error, mutate} = useTopRuleHit();
  const [params, setParams] = useState<CommonGetAllParams>({
    number: 10,
    page: 1,
  });
  const { data, error, mutate } = useAgent(params);
  const [dataTopRule, setDataTopRule] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [numOfPrevent24, setNumOfPrevent24] = useState<number>(0);

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
  const fetchNumbOfPrevent24 = async () => {
    try {
      const res = await statisticApi.getNumOfDetected24();
      if (res.status === 200) setNumOfPrevent24(res.data.detected_times)
      else message.error("Get number of detected within 24h fail")
    } catch (error) {
      message.error("Get number of detected within 24h fail")
    }
  }
  useEffect(() => {
    fetcher();
    fetchNumbOfPrevent24();
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
          <DashboardGeneralItem title="Number of service" value={data?.data?.length || 0} icon={<Icons.bell />} />
          <DashboardGeneralItem title="Number of prevent" value={numOfPrevent24} icon={<Icons.file />} />
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
