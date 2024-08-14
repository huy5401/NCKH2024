import { message, Tooltip, Card, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { agentApi } from "../../../../apis/agent";
import { RuleApi } from "../../../../apis/rule";
import CardTitleCustom from "../../../../components/CardTitleCustom";
import TableCustom from "../../../../components/TableCustom";
import { AgentType } from "../../../../constants/types/agent.type";
import { CommonGetAllParams } from "../../../../constants/types/common.type";
import { useAgent } from "../../../../utils/request";
import { useGetLevelRequestStatistic } from "../../../../utils/request/useStatistic";

const LevelRequestStatisticTable = () => {
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentType>({});


  const { data, isLoading, error, mutate } = useGetLevelRequestStatistic();

  console.log(data);
  
  const openEditModalHandler = (record: AgentType) => {
    setIsOpenEditModal(true);
    setSelectedAgent(record);
  }

  const closeEditModalHandler = () => {
    setIsOpenEditModal(false);
  }

  const columns: ColumnsType<AgentType> = [
    {
      key: 1,
      title: "Index",
      align: "center",
      width: "5%",
      render: (_, record, index) => {
        return index + 1;
      },
    },
    {
      key: 2,
      title: "Host",
      dataIndex: "host",
      align: "center",
      render: (host) => (
        <Tooltip title={host}>
          <div className="inline-text">{host}</div>
        </Tooltip>
      ),
    },
    {
      key: 3,
      title: "Port",
      dataIndex: "port",
      align: "center",
      render: (port) => (
        <Tooltip title={port}>
          <div className="inline-text">{port}</div>
        </Tooltip>
      ),
    },
    {
      key: 4,
      title: "Critical",
      dataIndex: "CRITICAL",
      align: "center",
      render: (CRITICAL) => (
        <Tag color="red">
          <div className="inline-text">{CRITICAL}</div>
        </Tag>
      ),
    },
    {
      key: 5,
      title: "High",
      dataIndex: "HIGH",
      align: "center",
      render: (HIGH) => (
        <Tag color="orange">
          <div className="inline-text">{HIGH}</div>
        </Tag>
      ),
    },
    {
      key: 6,
      title: "Medium",
      dataIndex: "MEDIUM",
      align: "center",
      render: (MEDIUM) => (
        <Tag color="green">
          <div className="inline-text">{MEDIUM}</div>
        </Tag>
      ),
    },
    {
      key: 7,
      title: "Low",
      dataIndex: "ERROR",
      align: "center",
      render: (ERROR) => (
        <Tag color="blue">
          <div className="inline-text">{ERROR}</div>
        </Tag>
      ),
    },
  ];

  return (
    <div>
      {/* <EditAgentModal
        isOpenModal={isOpenEditModal}
        closeModal={closeEditModalHandler}
        agent={selectedAgent}
        mutate={mutate}
      /> */}
      <Card className="card-container" size="small">
        <CardTitleCustom title="Statistical table of attack levels" />
        <TableCustom
          dataSource={data}
          columns={columns}
          bordered={true}
          isLoading={false}
          limit={0}
          total={data ? data.total : 0}
          onLimitChange={() => { }}
          onPageChange={() => { }}
          page={0}
          scroll={{y: 240}}
        />
      </Card>
    </div>
  );
};

export default LevelRequestStatisticTable;
