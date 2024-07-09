import React, { useEffect, useState } from "react";
import "./style.scss";
import UserManagementTable from "./ListFileConfigTable";
import { useDispatch } from "react-redux";
import { RULE_MANAGEMENT, USER_MANAGEMENT } from "../../routes/route.constant";
import { setSelectedBreadCrumb } from "../App/store/appSlice";
import UserManagementFilter from "./RuleManagementFilter";
import RuleManagementFilter from "./RuleManagementFilter";
import ListFileConfigTable from "./ListFileConfigTable";

const RuleManagement = () => {
  const [filter, setFilter]= useState<any>({})  
  const dispatch = useDispatch();
  useEffect(() => {
    let breadCrumb = [
       {
        label: "Rule management",
        path: ""
       }
    ]
    dispatch(setSelectedBreadCrumb(breadCrumb))
  },[RULE_MANAGEMENT]) 
  return (
    <div className="container-wrapper">
      <div style={{marginBottom: "12px"}}>
        <RuleManagementFilter filters={filter} setFilters={setFilter}/>
      </div>
       <ListFileConfigTable filter={filter} setFilter={setFilter}/>
    </div>
  );
};

export default RuleManagement;
