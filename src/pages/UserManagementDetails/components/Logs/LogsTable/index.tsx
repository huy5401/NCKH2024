import { Button, Card, Space, Tooltip, Typography, message } from "antd";
import { FC, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { saveAs } from 'file-saver'
import "./style.scss";
import dayjs from "dayjs";
import { CommonGetAllParams } from "../../../../../constants/types/common.type";
import CardTitleCustom from "../../../../../components/CardTitleCustom";
import TableCustom from "../../../../../components/TableCustom";
import { AgentType } from "../../../../../constants/types/agent.type";
import { FilterLogType, LogType } from "../../../../../constants/types/log.type";
import { useLog } from "../../../../../utils/request";
import { Excell } from "../../../../../assets/images";
import { LogsApi } from "../../../../../apis/log";
type Props = {
  agentData: AgentType;
  filter: FilterLogType;
  setFilter: (filter: FilterLogType) => void;
}
const LogsTable: FC<Props> = ({ agentData, filter }) => {
  const [params, setParams] = useState<CommonGetAllParams>({
    number: 10,
    page: 1,
  });
  const { data, isLoading, error, mutate } = useLog(params, filter, agentData.Port);
  const getFIleName = () => {
      const currentTime = new Date().getTime();
      const fileName = `modseclogs_${currentTime}p${agentData.Port}t${filter.time}`
      return fileName;
  }
  const handleExport = async () => {
    try {
      const response = await LogsApi.exportExcell(filter, { local_port: agentData.Port });
      if (response.status === 200) {
        var blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        saveAs(blob, getFIleName());
      } else message.error("Export file excell error")
    } catch (error) {
      message.error("Export file excell error")
    }
  };
  const columns: ColumnsType<LogType> = [
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
      title: "Time",
      dataIndex: "time",
      align: "left",
      width: "15%",
      render: (time) => (
        <Tooltip title={time}>
          <div className="inline-text">{dayjs(time).format('ddd MMM D YYYY HH:mm:ss')}</div>
        </Tooltip>
      ),
    },
    {
      key: 3,
      title: "Local port",
      dataIndex: "local_port",
      align: "left",
      width: "5%",
      render: (local_port) => (
        <Tooltip title={local_port}>
          <div className="inline-text">{local_port}</div>
        </Tooltip>
      ),
    },
    {
      key: 3,
      title: "Remote address",
      dataIndex: "remote_address",
      width: "10%",
      align: "left",
      render: (remote_address) => (
        <Tooltip title={remote_address}>
          <div className="inline-text">{remote_address}</div>
        </Tooltip>
      ),
    },
    {
      key: 5,
      title: "Remote port",
      dataIndex: "remote_port",
      align: "left",
      width: "5%",
      render: (remote_port) => (
        <Tooltip title={remote_port}>
          <div className="inline-text">{remote_port}</div>
        </Tooltip>
      ),
    },
    {
      key: 6,
      title: "Request",
      dataIndex: "request",
      align: "left",
      render: (request) => (
        <Tooltip title={request}>
          <div className="inline-text">{request}</div>
        </Tooltip>
      ),
    },
    {
      key: 7,
      title: "Detail",
      dataIndex: "message_msg",
      align: "left",
      render: (message_msg) => (
        <Tooltip title={message_msg}>
          <div className="inline-text">{message_msg}</div>
        </Tooltip>
      ),
    },
    {
      key: 8,
      title: "Rule mapped",
      dataIndex: "message_rule_id",
      align: "left",
      render: (message_rule_id) => (
        <Tooltip title={message_rule_id}>
          <div className="inline-text">{message_rule_id}</div>
        </Tooltip>
      ),
    },
  ];

  return (
    <div>
      <Card className="card-container" size="small">
        <Space style={{ justifyContent: "space-between", display: "flex" }}>
          <CardTitleCustom title="List logs" />
          <Button icon={<Excell />}
            style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', padding: "0px 6px" }}
            onClick={handleExport}
          >Export excell</Button>
        </Space>
        <TableCustom
          dataSource={data?.data}
          columns={columns}
          bordered={true}
          isLoading={false}
          //isLoading={!data && isLoading}
          limit={params.number || 10}
          total={data ? data.total : 0}
          onLimitChange={(number) => {
            setParams({ ...params, number });
          }}
          onPageChange={(page) => {
            setParams({ ...params, page });
          }}
          page={params.page || 1}
        />
      </Card>
    </div>
  );
};

export default LogsTable;
