import React, { useState } from "react";
import "./style.scss";
import RemovedRuleTable from "./RemovedRuleTable";
import RemovedRuleFilter from "./RemovedRuleFilter";

const CRSManagement = () => {
  const [filter, setFilter] = useState<any>({})
  return (
    <div>
      <div style={{ marginBottom: "12px" }}>
        <RemovedRuleFilter filters={filter} setFilters={setFilter} />
      </div>
      
      <RemovedRuleTable />
    </div>
  );
};

export default CRSManagement;
