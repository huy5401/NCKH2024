import React, { useState } from "react";
import "./style.scss";
import ListFileConfigTable from "./ListFileConfigTable";
import RuleManagementFilter from "./RuleManagementFilter";

const RuleCustomManagement = () => {
  const [filter, setFilter]= useState<any>({});
  return (
    <div>
      <div style={{marginBottom: "12px"}}>
        <RuleManagementFilter filters={filter} setFilters={setFilter}/>
      </div>
       <ListFileConfigTable filter={filter} setFilter={setFilter}/>
    </div>
  );
};

export default RuleCustomManagement;
