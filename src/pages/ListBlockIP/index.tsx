import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { RULE_MANAGEMENT } from "../../routes/route.constant";
import { setSelectedBreadCrumb } from "../App/store/appSlice";
import ListBlockIPFilter from "./ListBlockIPFilter";
import ListBlockIPTable from "./ListBlockIpTable";
import ListBlockCountries from "./ListBlockCountries";

const ListBlockIP = () => {
  const [filter, setFilter]= useState<any>({});
  const listBlockIPTableRef = useRef<any>(null);
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

  const muateHandler = () => {
    if(listBlockIPTableRef.current){
      listBlockIPTableRef.current.mutate();
    }
  }
  return (
    <div className="container-wrapper">
      <div style={{marginBottom: "12px"}}>
        <ListBlockIPFilter filters={filter} setFilters={setFilter} mutate={muateHandler}/>
      </div>
       <ListBlockIPTable filter={filter} setFilter={setFilter} ref={listBlockIPTableRef}/>
       <ListBlockCountries/>
    </div>
  );
};

export default ListBlockIP;
