import { Card, Tooltip, message } from "antd";
import { FC, useState } from "react";
import { ColumnsType } from "antd/es/table";
import "./style.scss";
import ListButtonActionUpdate from "../../../../components/ListButtonActionUpdate";
import TableCustom from "../../../../components/TableCustom";
import { CommonGetAllParams } from "../../../../constants/types/common.type";
import CardTitleCustom from "../../../../components/CardTitleCustom";
import { useNavigate } from "react-router-dom";
import { AgentType, FilterAgentType } from "../../../../constants/types/agent.type";
import { RuleApi } from "../../../../apis/rule";
import { useListFileConfig } from "../../../../utils/request/useListFileConfig";


type Props = {
  filter: FilterAgentType;
  setFilter: (filter: FilterAgentType) => void;
};
const ListFileConfigTable: FC<Props> = ({ filter }) => {
  const navigate = useNavigate();
  const [params, setParams] = useState<CommonGetAllParams>({
    number: 10,
    page: 1,
  });
  const { data, isLoading, error, mutate } = useListFileConfig(params);

  const removeRuleFileHandler = async (file_name?: string) => {
    try {
      const res = await RuleApi.deleteRuleFile({ rule_name: file_name?.replace('.conf', '') });
      if (res.status === 200) {
        message.success("Deleted rule file successfully");
        mutate();
      }
      else message.error("Deleted rule file failed");
    } catch (error) {
      message.error("Deleted rule file failed");
    }
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
      title: "File name",
      dataIndex: "file_name",
      align: "center",
      render: (file_name) => (
        <Tooltip title={file_name}>
          <div className="inline-text">{file_name}</div>
        </Tooltip>
      ),
    },
    {
      key: 3,
      title: "Created At",
      dataIndex: "creation_date",
      align: "center",
      render: (creation_date) => (
        <Tooltip title={creation_date}>
          <div className="inline-text">{creation_date}</div>
        </Tooltip>
      ),
    },
    {
      key: 4,
      title: "Edited At",
      dataIndex: "modification_date",
      align: "center",
      render: (modification_date) => (
        <Tooltip title={modification_date}>
          <div className="inline-text">{modification_date}</div>
        </Tooltip>
      ),
    },
    {
      key: 9,
      title: "Action",
      align: "center",
      width: "10%",
      render: (_, record: any) => (
        <>
          <ListButtonActionUpdate
            editFunction={() => navigate(`/rule-file-details/${record.file_name.replace('.conf', '')}`)}
            removeFunction={() => removeRuleFileHandler(record.file_name)}
          />
        </>
      ),
    },
  ];

  return (
    <div>
      <Card className="card-container" size="small">
        <CardTitleCustom title="List File Config" />
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

export default ListFileConfigTable;
