import React, { FC, useState } from "react";
import "./style.scss";
import LogsTable from "./LogsTable";
import LogsFilter from "./LogsFilter";
import { AgentType } from "../../../../constants/types/agent.type";
import { FilterLogType } from "../../../../constants/types/log.type";
type Props = {
  agentData: AgentType;
}

const Logs:FC<Props> = ({agentData}) => {
  const [filter, setFilter]= useState<FilterLogType>({time: 24})
  return (
    <>
      <div style={{ marginBottom: '12px' }}>
        <LogsFilter filters={filter} setFilters={setFilter}/>
      </div>
      <LogsTable agentData={agentData} filter={filter} setFilter={setFilter}/>
    </>
  );
};

export default Logs;
