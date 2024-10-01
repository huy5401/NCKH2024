import {
  Space,
  Form,
  Input,
  InputNumber,
  message,
} from "antd";
import "./style.scss";
import React, { useEffect, useState } from "react";
import ButtonCustom from "../../../../components/ButtonCustom";
import { FilterAgentType } from "../../../../constants/types/agent.type";
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { RuleApi } from "../../../../apis/rule";

type Props = {
  filters: FilterAgentType;
  setFilters: (filters: FilterAgentType) => void;
};
const RemovedRuleFilter: React.FC<Props> = ({ filters, setFilters }) => {
  const [filterData, setFilterData] = useState<FilterAgentType>({});
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [inboundAnomalyScoreThreshold, setInboundAnomalyScoreThreshold] = useState<number>(0);
  const [form] = Form.useForm();

  const getInboundAnomalyScoreThreshold = async () => {
    try {
      const res = await RuleApi.getInboundAnomalyScoreThreshold();
      if (res.status === 200) {
        const threshold = res.data.inbound_anomaly_score_threshold;
        setInboundAnomalyScoreThreshold(threshold);
        form.setFieldsValue({ inbound_anomaly_score_threshold: threshold });
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (filters) {
      setFilterData({ ...filterData, ...filters })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);
  useEffect(() => {
    getInboundAnomalyScoreThreshold();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: any) => {
    try {
      const res = await RuleApi.updateInboundAnomalyScoreThreshold(e.inbound_anomaly_score_threshold);
      if (res.status === 200) {
        message.success("Update inbound anomaly score threshold successfully")
        setIsUpdate(false)
      }
    } catch (error) {
      message.error("Update inbound anomaly score threshold failed")
      console.log(error) 
    }
  }
  const handleCancel = () => {
    setIsUpdate(false)
    form.setFieldsValue({ inbound_anomaly_score_threshold: inboundAnomalyScoreThreshold });
  }
  return (
    <Space style={{ justifyContent: "space-between", display: "flex" }}>
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
      <Form
        form={form}
        style={{ width: "480px", display: "flex", alignItems: "center", justifyContent: "end", gap: 10 }} layout="inline"
        onFinish={handleSubmit}
        className="inbound-anomaly-form"
      >
        <Form.Item label="Inbound Anomaly Score Threshold" name="inbound_anomaly_score_threshold">
          <InputNumber 
            style={{ flex: 1 }}
            defaultValue={inboundAnomalyScoreThreshold}
            min={0}
            onChange={(e: any) => {
              setIsUpdate(true)
            }}
            disabled={!isUpdate}
          />
        </Form.Item>
        <Form.Item>
          {
            isUpdate ? <div style={{ display: "flex", gap: 8 }}>
              <ButtonCustom
                type="primary"
                htmlType="submit"
                icon={<CheckOutlined />}
              />
              <ButtonCustom
                type="default"
                icon={<CloseOutlined />}
                onClick={handleCancel}
              />
            </div> : <>
              <ButtonCustom
                type="primary"
                icon={<EditOutlined />}
                onClick={() => setIsUpdate(true)}
              />
            </>
          }

        </Form.Item>
      </Form>
    </Space>
  );
};

export default RemovedRuleFilter;
