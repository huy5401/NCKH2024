import React, { useEffect, useState } from "react";
import "./style.scss";
import UserManagementTable from "./UserManagementTable";
import { useDispatch } from "react-redux";
import { USER_MANAGEMENT } from "../../routes/route.constant";
import { setSelectedBreadCrumb } from "../App/store/appSlice";
import UserManagementFilter from "./UsermanagementFilter";

const UserManagement = () => {
  const [filter, setFilter]= useState<any>({})  
  const dispatch = useDispatch();
  useEffect(() => {
    let breadCrumb = [
       {
        label: "User management",
        path: ""
       }
    ]
    dispatch(setSelectedBreadCrumb(breadCrumb))
  },[USER_MANAGEMENT]) 
  return (
    <div className="container-wrapper">
      <div style={{marginBottom: "12px"}}>
        <UserManagementFilter filters={filter} setFilters={setFilter}/>
      </div>
       <UserManagementTable filter={filter} setFilter={setFilter}/>
    </div>
  );
};

export default UserManagement;
