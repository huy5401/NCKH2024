import { Card, Select, Tooltip, message } from "antd";
import { FC, useState } from "react";
import { ColumnsType } from "antd/es/table";
import "./style.scss";
import ListButtonActionUpdate from "../../../components/ListButtonActionUpdate";
import TableCustom from "../../../components/TableCustom";
import { CommonGetAllParams } from "../../../constants/types/common.type";
import CardTitleCustom from "../../../components/CardTitleCustom";
import { useNavigate } from "react-router-dom";
import { AgentType, FilterAgentType } from "../../../constants/types/agent.type";
import { useAgent } from "../../../utils/request";
import { agentApi } from "../../../apis/agent";
import { RuleApi } from "../../../apis/rule";


type Props = {
  filter: FilterAgentType;
  setFilter: (filter: FilterAgentType) => void;
};
const ListBlockIPTable: FC<Props> = ({ filter }) => {
  const navigate = useNavigate();
  const [params, setParams] = useState<CommonGetAllParams>({
    number: 10,
    page: 1,
  });
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentType>({});


  const { data, isLoading, error, mutate } = useAgent(params, filter);

  const openEditModalHandler = (record: AgentType) => {
    setIsOpenEditModal(true);
    setSelectedAgent(record);
  }

  const closeEditModalHandler = () => {
    setIsOpenEditModal(false);
  }
  const handleChangeRuleEngine = async (e:any, ServerName?:string) => {
    try {
        const res = await RuleApi.updateModeAgent({ServerName: ServerName, mode: e});
        if(res.status === 200){
            message.success(res.data.message);
            mutate();
        }else message.error("Update mode agent fail");
    } catch (error) {
      message.error("Update mode agent fail");
    }
  }
  const removeAgentHandler = async (idAgent?: number) => {
    try {
      const res = await agentApi.delete(idAgent);
      if (res.status === 200){
        message.success(res.data.message);
        mutate();
      }
      else message.error("Delete agent fail");
    } catch (error) {
      message.error("Delete agent fail");
    }
  }

  const columns: ColumnsType<AgentType> = [
    {
      key: 1,
      title: "Index",
      align: "center",
      width: "10%",
      render: (_, record, index) => {
        return index + 1;
      },
    },
    {
      key: 2,
      title: "IP Address",
      dataIndex: "ipaddr",
      align: "center",
      render: (ipaddr) => (
        <Tooltip title={ipaddr}>
          <div className="inline-text">{ipaddr}</div>
        </Tooltip>
      ),
    },
    {
      key: 3,
      title: "Action",
      align: "center",
      width: "10%",
      render: (_, record) => (
        <>
          <ListButtonActionUpdate
            editFunction={() => openEditModalHandler(record)}
            viewFunction={() => navigate(`/user-management-details/${record.id}`, { state: { agentDetails: record } })}
            removeFunction={() => removeAgentHandler(record.id)}
          />
        </>
      ),
    },
  ];

  return (
    <div>
      <Card className="card-container" size="small">
        <CardTitleCustom title="List Blocked IP" />
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

export default ListBlockIPTable;
