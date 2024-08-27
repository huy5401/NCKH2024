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
  const [top10Attacks, setTop10Attacks] = useState<any>([]);

  const fetchNumbOfPrevent24 = async () => {
    try {
      const res = await statisticApi.getNumOfDetected24ById(Number(id));
      if (res.status === 200) setNumOfPrevent24(res.data.detected_times)
      else message.error("Get number of detected within 24h failed")
    } catch (error) {
      message.error("Get number of detected within 24h failed")
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
  useEffect(() => {
    fetchTop10Attacks();
    fetchNumbOfPrevent24();
    fetchNumbOfRequests24();
  }, [agentData])
  return (
    <div className="customers-wrapper" style={{padding: 0}}>
      <Space direction="horizontal" className="dasboard-gn-wrapper" style={{width: "100%",justifyContent: "space-around"}}>
        <DashboardGeneralItem title="Number of detections" value={numOfPrevent24} icon={<Icons.bell />} />
        <DashboardGeneralItem title="Number of requests within 24h" value={numOfRequests24} icon={<Icons.bell />} />
        <DboardTopCardItem title="Top Ip prevented" value={['102.34.6.57', '12.54.67.77', '103.45.45.12']} icon={<Icons.camera />}/>
        <DboardTopCardItem title="Top vulnerabilities" value={top10Attacks?.map((item: any) => item.message_msg)} icon={<Icons.file />}/>
      </Space>
      <DashboardChart />
      <Space direction="horizontal" className="dasboard-gn-wrapper" style={{marginTop: 10}}>
      </Space>
    </div>
  );
};

export default UserMnDashboard;
