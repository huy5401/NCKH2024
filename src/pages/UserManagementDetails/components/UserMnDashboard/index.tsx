import React, { FC, useEffect, useState } from "react";
import DashboardChart from "./component/DashboardChart";
import './style.scss'
import { Space, message } from "antd";
import Icons from "../../../../assets/icons";
import DashboardGeneralItem from "../../../Dashboard/component/DashboardGeneralItem";
import DboardTopCardItem from "../../../Dashboard/component/DboardTopCardItem";
import { statisticApi } from "../../../../apis/statistic";
import { AgentType } from "../../../../constants/types/agent.type";
import { useParams } from "react-router-dom";

type Props = {
  agentData: AgentType;
}
const UserMnDashboard:FC<Props> = ({agentData}) => {
  const {id} = useParams();
  const [numOfPrevent24, setNumOfPrevent24] = useState<number>(0);
  const [numOfRequests24, setNumOfRequests24] = useState<number>(0);
  const [dataTopIP, setDataTopIP] = useState([]);
  const fetchNumbOfPrevent24 = async () => {
    try {
      const res = await statisticApi.getNumOfDetected24ById(Number(id));
      if (res.status === 200) setNumOfPrevent24(res.data.detected_times)
      else message.error("Get number of detected within 24h failed")
    } catch (error) {
      message.error("Get number of detected within 24h failed")
    }
  }
  const fetchTopRule = async () => {
    try {
      const res = await statisticApi.getTopRuleHit();
      if (res.status === 200) {
      } else message.error("Error get top ip");
    } catch (error) {
      message.error("Error get top ip");
    }
  }
  const fetchNumbOfRequests24 = async () => {
    try {
      const res = await statisticApi.getNumOfRequestsByServerName({
        ServerName: agentData.ServerName,
        local_port: agentData.Port,
        time: 24
      });
      if (res.status === 200) setNumOfRequests24(res.data)
      else message.error("Get number of requests within 24h failed")
    } catch (error) {
      message.error("Get number of requests within 24h failed")
    }
  }
  console.log(numOfRequests24);
  
  useEffect(() => {
    fetchNumbOfPrevent24();
    fetchNumbOfRequests24();
  }, [agentData])
  return (
    <div className="customers-wrapper" style={{padding: 0}}>
      <Space direction="horizontal" className="dasboard-gn-wrapper" style={{width: "100%",justifyContent: "space-around"}}>
        <DashboardGeneralItem title="Number of detections" value={numOfPrevent24} icon={<Icons.bell />} />
        <DashboardGeneralItem title="Number of requests within 24h" value={numOfRequests24} icon={<Icons.bell />} />
        <DboardTopCardItem title="Top Ip prevented" value={['102.34.6.57', '12.54.67.77', '103.45.45.12']} icon={<Icons.camera />}/>
        <DboardTopCardItem title="Top vulnerabilities" value={['XSS', 'SQL Injection', 'File Upload']} icon={<Icons.file />}/>
      </Space>
      <DashboardChart />
      <Space direction="horizontal" className="dasboard-gn-wrapper" style={{marginTop: 10}}>
      </Space>
    </div>
  );
};

export default UserMnDashboard;
