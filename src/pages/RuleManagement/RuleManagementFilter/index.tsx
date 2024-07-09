import {
  Button,
  Card,
  Row,
  Space,
  Typography,
  Form,
  Input,
} from "antd";
import "./style.scss";
import React, { useEffect, useState } from "react";
import ButtonCustom from "../../../components/ButtonCustom";
import { FilterAgentType } from "../../../constants/types/agent.type";
import { useNavigate } from "react-router-dom";
import { ADD_AGENT } from "../../../routes/route.constant";

type Props = {
  filters: FilterAgentType;
  setFilters: (filters: FilterAgentType) => void;
};


const RuleManagementFilter: React.FC<Props> = ({ filters, setFilters }) => {
  const [filterData, setFilterData] = useState<FilterAgentType>({});
  const navigate = useNavigate();
  useEffect(() => {
    if (filters) {
      setFilterData({ ...filterData, ...filters })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);



  return (
    <Space style={{justifyContent: "space-between", display:"flex"}}>
      <Form className="userManager-FilterForm">
        <Space direction="horizontal" style={{ width: '100%' }}>
          <Input placeholder="Search..."
            value={filterData.filters}
            onChange={(e: any) => setFilterData({ filters: e.target.value })}
          />
          <ButtonCustom
            label="Search"
            bgColor="#2862AF"
            type="primary"
            onClick={() => setFilters({ ...filterData })}
          />
        </Space>
      </Form>
      <ButtonCustom
        label="Add agent"
        bgColor="#2862AF"
        type="primary"
        onClick={() => {navigate(ADD_AGENT)}}
      />
    </Space>
  );
};

export default RuleManagementFilter;
