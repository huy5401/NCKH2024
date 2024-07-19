import { Card, Select, Tooltip, message } from "antd";
import { FC, useState } from "react";
import { ColumnsType } from "antd/es/table";
import "./style.scss";
import ListButtonActionUpdate from "../../../../components/ListButtonActionUpdate";
import TableCustom from "../../../../components/TableCustom";
import { CommonGetAllParams } from "../../../../constants/types/common.type";
import CardTitleCustom from "../../../../components/CardTitleCustom";
import { useNavigate } from "react-router-dom";
import { AgentType } from "../../../../constants/types/agent.type";
import { agentApi } from "../../../../apis/agent";
import { RuleApi } from "../../../../apis/rule";
import { useRemovedRule } from "../../../../utils/request/useRemovedRule";

type RuleDeteted = {
  id_rule: string,
  rule_file: string,
  servername: string,
  port: string
}
const RemovedRuleTable: FC = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState<CommonGetAllParams>({
    number: 10,
    page: 1,
  });

  const { data, isLoading, error, mutate } = useRemovedRule(params);

  const restoreRuleCRSHandler = async (record: RuleDeteted) => {
    try {
      const res = await RuleApi.restoreRuleCRS({
         id_rule: record.id_rule
      })
      if(res.status === 200){
         message.success("Restored rule successfully");
         mutate();
      }else message.error("Restored rule failed");
    } catch (error) {
      message.error("Restored rule failed");
    }
  }

  const restoreRuleAgentHandler = async (record: RuleDeteted) => {
    try {
      const res = await RuleApi.restoreRuleEachAgent({
         id_rule: record.id_rule,
         ServerName: record.servername,
         Port: record.port
      })
      if(res.status === 200){
         message.success("Restored rule successfully");
         mutate();
      }else message.error("Restored rule failed");
    } catch (error) {
      message.error("Restored rule failed");
    }
  }

  const columns: ColumnsType<RuleDeteted> = [
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
      title: "Rule id",
      dataIndex: "id_rule",
      align: "center",
      render: (id_rule) => (
        <Tooltip title={id_rule}>
          <div className="inline-text">{id_rule}</div>
        </Tooltip>
      ),
    },
    {
      key: 3,
      title: "Rule file",
      dataIndex: "rule_file",
      align: "center",
      render: (rule_file) => (
        <Tooltip title={rule_file}>
          <div className="inline-text">{rule_file}</div>
        </Tooltip>
      ),
    },
    {
      key: 4,
      title: "Server Name",
      dataIndex: "servername",
      align: "center",
      render: (servername) => (
        <Tooltip title={servername}>
          <div className="inline-text">{servername}</div>
        </Tooltip>
      ),
    },
    {
      key: 5,
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
      key: 6,
      title: "Action",
      align: "center",
      width: "10%",
      render: (_, record: RuleDeteted) => {
        if (record.servername === 'ALL' && record.port === 'ALL') {
          return (
            <ListButtonActionUpdate
              retoreFunction={() => restoreRuleCRSHandler(record)}
            />
          );
        } else {
          return (<ListButtonActionUpdate
            retoreFunction={() => restoreRuleAgentHandler(record)}
          />);
        }
      },
    },
  ];

  return (
    <div>
      <Card className="card-container" size="small">
        <CardTitleCustom title="List Removed Rule" />
        <TableCustom
          dataSource={data?.data}
          columns={columns}
          bordered={true}
          isLoading={!data && isLoading}
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

export default RemovedRuleTable;
