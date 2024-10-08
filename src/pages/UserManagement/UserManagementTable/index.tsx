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
import EditAgentModal from "../UsermgnEditModal";
import { agentApi } from "../../../apis/agent";
import { ConfigApi } from "../../../apis/config";


type Props = {
  filter: FilterAgentType;
  setFilter: (filter: FilterAgentType) => void;
};
const UserManagementTable: FC<Props> = ({ filter }) => {
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
  const handleChangeRuleEngine = async (e:any, ServerName?:string, Port?:string) => {
    try {
        const res = await ConfigApi.updateModeAgent({ServerName: ServerName, Port:Port, mode: e});
        if(res.status === 200){
            message.success("Updated mode website successfully");
            mutate();
        }else message.error("Updated mode website failed");
    } catch (error) {
      message.error("Updated mode website failed");
    }
  }
  const removeAgentHandler = async (idAgent?: number) => {
    try {
      const res = await agentApi.delete(idAgent);
      if (res.status === 200){
        message.success(res.data.message);
        mutate();
      }
      else message.error("Deleted website failed");
    } catch (error) {
      message.error("Deleted website failed");
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
      title: "Website",
      dataIndex: "ServerName",
      align: "center",
      render: (servername) => (
        <Tooltip title={servername}>
          <div className="inline-text">{servername}</div>
        </Tooltip>
      ),
    },
    {
      key: 3,
      title: "Protocol",
      dataIndex: "Protocol",
      align: "center",
      render: (protocol) => (
        <Tooltip title={protocol}>
          <div className="inline-text">{protocol}</div>
        </Tooltip>
      ),
    },
    {
      key: 4,
      title: "Proxy preserve host",
      dataIndex: "ProxyPreserveHost",
      align: "center",
      render: (proxypreservehost) => (
        <Tooltip title={proxypreservehost}>
          <div className="inline-text">{proxypreservehost}</div>
        </Tooltip>
      ),
    },
    {
      key: 5,
      title: "Proxypass",
      dataIndex: "ProxyPass",
      align: "center",
      render: (proxypass) => (
        <Tooltip title={proxypass}>
          <div className="inline-text">{proxypass}</div>
        </Tooltip>
      ),
    },
    {
      key: 6,
      title: "Proxypass reverse",
      dataIndex: "ProxyPassReverse",
      align: "center",
      render: (proxypassreverse) => (
        <Tooltip title={proxypassreverse}>
          <div className="inline-text">{proxypassreverse}</div>
        </Tooltip>
      ),
    },
    {
      key: 7,
      title: "Server port",
      dataIndex: "Port",
      align: "center",
      render: (Port) => (
        <Tooltip title={Port}>
          <div className="inline-text">{Port}</div>
        </Tooltip>
      ),
    },
    {
      key: 8,
      title: "Rule engine",
      dataIndex: "SecRuleEngine",
      align: "center",
      render: (SecRuleEngine, record,_) => (
        <Tooltip title={SecRuleEngine}>
          {/* <div className="inline-text">{SecRuleEngine}</div> */}
          <Select style={{width: 100}} defaultValue={SecRuleEngine} onChange={(e) => handleChangeRuleEngine(e, record.ServerName, record.Port)}>
             <Select.Option key={1} value="On">On</Select.Option>
             <Select.Option key={2} value="Off">Off</Select.Option>
             <Select.Option key={3} value="DetectionOnly">DetectionOnly</Select.Option>
          </Select>
        </Tooltip>
      ),
    },
    {
      key: 9,
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
      <EditAgentModal
        isOpenModal={isOpenEditModal}
        closeModal={closeEditModalHandler}
        agent={selectedAgent}
        mutate={mutate}
      />
      <Card className="card-container" size="small">
        <CardTitleCustom title="List websites" />
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

export default UserManagementTable;
