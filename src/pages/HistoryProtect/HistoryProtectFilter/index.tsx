import {
  Space,
  Form,
  Input,
  CollapseProps,
  Collapse,
  Typography,
  Select,
} from "antd";
import "./style.scss";
import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import ButtonCustom from "../../../components/ButtonCustom";
import { FilterLogType } from "../../../constants/types/log.type";

type Props = {
  filters: FilterLogType;
  setFilters: (filters: FilterLogType) => void;
};


const HistoryProtectFilter: React.FC<Props> = ({ filters, setFilters }) => {
  const [filterData, setFilterData] = useState<FilterLogType>({}); 
  useEffect(() => {
    if (filters) {
      setFilterData({ ...filterData, ...filters })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const items: CollapseProps["items"] = [
    {
      key: '1',
      label: "Filter",
      children: (
        <Form className="userManager-FilterForm" layout="horizontal">
          <Space direction="horizontal" style={{ width: '100%' }}>
            <Form.Item label="IP source" name="src_ip">
              <Input placeholder="IP source ..." value={filterData.src_ip}
                onChange={(e: any) => setFilterData({ ...filterData,src_ip: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Time"
              name="time"
            >
              <Select placeholder="hours" allowClear
                style={{ width: "120px" }}
                value={filterData.time}
                defaultValue={filterData.time}
                onChange={(e) => setFilterData({ ...filterData,time: e })}
              >
                <Select.Option value={12}>12 hours</Select.Option>
                <Select.Option value={24}>24 hours</Select.Option>
                <Select.Option value={48}>48 hours</Select.Option>
                <Select.Option value={168}>1 week</Select.Option>
                <Select.Option value={720}>1 month</Select.Option>
                <Select.Option value={2160}>3 months</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Search"
              name="filters"
            >
              <Input placeholder="Search..." value={filterData.filters}
                onChange={(e: any) => setFilterData({ ...filterData,filters: e.target.value })}
              />
            </Form.Item>
          </Space>
          <ButtonCustom
            label="Search"
            bgColor="#2862AF"
            type="primary"
            onClick={() => setFilters({ ...filterData })}
          />
        </Form>
      )

    }
  ]

  return (
    <>
      <Collapse
        expandIcon={({ isActive }) => (
          <Space>
            <Typography style={{ color: "#2862af" }}>
              {isActive ? "Hide filter" : "Show filter"}
            </Typography>
            <DownOutlined
              rotate={isActive ? 180 : 0}
              style={{ color: "#2862af" }}
            />
          </Space>
        )}
        items={items}
        expandIconPosition="end"
        bordered={false}
        className="filterLogs-collapse"
      />
    </>
  );
};

export default HistoryProtectFilter;
