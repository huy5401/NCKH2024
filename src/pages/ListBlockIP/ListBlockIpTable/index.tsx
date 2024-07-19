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
import { useGetBlackList } from "../../../utils/request/useGetBlackList";


type Props = {
  filter: FilterAgentType;
  setFilter: (filter: FilterAgentType) => void;
};
const ListBlockIPTable: FC<Props> = ({ filter }) => {
  const [params, setParams] = useState<CommonGetAllParams>({
    number: 10,
    page: 1,
  });

  const { data, isLoading, error, mutate } = useGetBlackList(params);

  const removeFromBlackListHandler = async (ipAddr?: string) => {
    try {
      const res = await RuleApi.deleteIPFromBlacklist({ip_address:ipAddr});
      if (res.status === 200){
        message.success("Deleled ip from blacklist successfully");
        mutate();
      }
      else message.error("Deleted ip from blacklist failed");
    } catch (error) {
      message.error("Deleted ip from blacklist failed");
    }
  }

  const columns: ColumnsType<any> = [
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
      // dataIndex: "ipaddr",
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
      render: (text, record) => (
        <>
          <ListButtonActionUpdate
            removeFunction={() => removeFromBlackListHandler(text)}
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
