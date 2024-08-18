import React, { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { RULE_MANAGEMENT } from "../../routes/route.constant";
import { setSelectedBreadCrumb } from "../App/store/appSlice";
import ListBlockIPFilter from "./ListBlockIPFilter";
import ListBlockIPTable from "./ListBlockIpTable";
import ListBlockCountries from "./ListBlockCountries";

const ListBlockIP = () => {
  const [filter, setFilter]= useState<any>({})  
  const dispatch = useDispatch();
  useEffect(() => {
    let breadCrumb = [
       {
        label: "List Blocked IP",
        path: ""
       }
    ]
    dispatch(setSelectedBreadCrumb(breadCrumb))
  },[RULE_MANAGEMENT]) 
  return (
    <div className="container-wrapper">
      <div style={{marginBottom: "12px"}}>
        <ListBlockIPFilter filters={filter} setFilters={setFilter}/>
      </div>
       <ListBlockIPTable filter={filter} setFilter={setFilter}/>
       <ListBlockCountries/>
    </div>
  );
};

export default ListBlockIP;
