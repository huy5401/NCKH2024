import React, { useEffect, useState } from "react";
import DashboardChart from "./component/DashboardChart";
import './style.scss'
import { useDispatch } from "react-redux";
import { setSelectedBreadCrumb } from "../App/store/appSlice";
import DashboardGeneralItem from "./component/DashboardGeneralItem";
import { Space, Spin, message } from "antd";
import Icons from "../../assets/icons";
import DboardTopCardItem from "./component/DboardTopCardItem";
import { useAgent } from "../../utils/request";
import { statisticApi } from "../../apis/statistic";
import { CommonGetAllParams } from "../../constants/types/common.type";
import LevelRequestStatisticTable from "./component/LevelRequestStatisticTable";
import StoragePerformance from "../../components/StoragePerformance";
const Dashboard = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useState<CommonGetAllParams>({
    number: 10,
    page: 1,
  });
  const { data, error, mutate } = useAgent(params);
  const [isLoading, setIsLoading] = useState(false);
  const [numOfPrevent24, setNumOfPrevent24] = useState<number>(0);
  const [numOfRequests24, setNumOfRequests24] = useState<number>(0);
  const [top10Attacks, setTop10Attacks] = useState<any>([]);

  const fetchNumbOfPrevent24 = async () => {
    try {
      const res = await statisticApi.getNumOfDetected24();
      if (res.status === 200) setNumOfPrevent24(res.data.detected_times);
      else message.error("Get number of detected within 24h failed");
    } catch (error) {
      message.error("Get number of detected within 24h failed");
    }
  }
  const fetchNumbOfRequest24 = async () => {
    try {
      const res = await statisticApi.getNumOfRequests();
      if (res.status === 200) setNumOfRequests24(res.data);
      else message.error("Get number of requests within 24h failed");
    } catch (error) {
      message.error("Get number of requests within 24h failed");
    }
  }
  const fetchTop10Attacks = async () => {
    try {
      const res = await statisticApi.getTop10Attacks();
      if (res.status === 200) setTop10Attacks(res.data.slice(0,3));
      else message.error("Get top 3 vulnabilities failed");
    } catch (error) {
      message.error("Get top 3 vulnabilities failed");
    }
  }
  useEffect(() => {
    fetchNumbOfPrevent24();
    fetchNumbOfRequest24();
    fetchTop10Attacks();
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
    <div className="container-wrapper">
      <Spin spinning={isLoading}>
        <Space direction="horizontal" className="dasboard-gn-wrapper" style={{justifyContent: "space-between", width: "100%"}}>
          <DashboardGeneralItem title="Number of service" value={data?.data?.length || 0} icon={<Icons.bell />} />
          <DashboardGeneralItem title="Number of requests" value={numOfRequests24} icon={<Icons.file />} />
          <DashboardGeneralItem title="Number of detections" value={numOfPrevent24} icon={<Icons.file />} />
          <DboardTopCardItem title="Top vulnabilities" value={top10Attacks?.map((item: any) => item.message_msg)} icon={<Icons.camera />} />
        </Space>
        <StoragePerformance/>
        <div style={{ width: "100%", marginBottom: "10px" }}>
          <LevelRequestStatisticTable />
        </div>
        <DashboardChart />
        <Space direction="horizontal" className="dasboard-gn-wrapper" style={{ marginTop: 10 }}>
          
        </Space>
      </Spin>
    </div>
  );
};

export default Dashboard;
