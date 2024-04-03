import React, { FC, useEffect, useState } from "react";
import DashboardChart from "./component/DashboardChart";
import './style.scss'
import { useDispatch } from "react-redux";
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
  const fetchNumbOfPrevent24 = async () => {
    try {

      const res = await statisticApi.getNumOfDetected24ById(Number(id));
      if (res.status === 200) setNumOfPrevent24(res.data.detected_times)
      else message.error("Get number of detected within 24h fail")
    } catch (error) {
      message.error("Get number of detected within 24h fail")
    }
  }
  useEffect(() => {
    fetchNumbOfPrevent24();
  }, [])
  return (
    <div className="customers-wrapper">
      <Space direction="horizontal" className="dasboard-gn-wrapper">
        <DashboardGeneralItem title="Detected within 24 hours" value={numOfPrevent24} icon={<Icons.bell />} />
        <DashboardGeneralItem title="Num of attacks prevented" value={10} icon={<Icons.bell />} />
      </Space>
      <DashboardChart />
      <Space direction="horizontal" className="dasboard-gn-wrapper" style={{marginTop: 10}}>
          <DboardTopCardItem title="Top vulnerabilities" value={['XSS', 'SQL Injection', 'File Upload']} icon={<Icons.file />}/>
          <DboardTopCardItem title="Top Ip prevented" value={['100201', '192020', '192829']} icon={<Icons.camera />}/>
      </Space>
    </div>
  );
};

export default UserMnDashboard;
