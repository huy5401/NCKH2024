import React, { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { HISTORY_PROTECT, RULE_MANAGEMENT } from "../../routes/route.constant";
import { setSelectedBreadCrumb } from "../App/store/appSlice";
import HistoryProtectFilter from "./HistoryProtectFilter";
import HistoryProtectTable from "./HistoryProtectTable";

const ListBlockIP = () => {
  const [filter, setFilter]= useState<any>({})  
  const dispatch = useDispatch();
  useEffect(() => {
    let breadCrumb = [
       {
        label: "History Protect",
        path: ""
       }
    ]
    dispatch(setSelectedBreadCrumb(breadCrumb))
  },[HISTORY_PROTECT]) 
  return (
    <div className="container-wrapper">
      <div style={{marginBottom: "12px"}}>
        <HistoryProtectFilter filters={filter} setFilters={setFilter}/>
      </div>
       <HistoryProtectTable filter={filter} setFilter={setFilter}/>
    </div>
  );
};

export default ListBlockIP;
