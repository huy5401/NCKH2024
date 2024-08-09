import { Button, Card, Dropdown, Menu, Space, Tooltip, Typography, message } from "antd";
import { FC, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { saveAs } from 'file-saver'
import "./style.scss";
import dayjs from "dayjs";
import { LogsApi } from "../../../apis/log";
import { Excell } from "../../../assets/images";
import CardTitleCustom from "../../../components/CardTitleCustom";
import TableCustom from "../../../components/TableCustom";
import { CommonGetAllParams } from "../../../constants/types/common.type";
import { FilterLogType, LogType } from "../../../constants/types/log.type";
import { AttackerMap } from "../../UserManagementDetails/components/Logs/AttackerMap";
import { useHistoryProtect } from "../../../utils/request/useHistoryProtect";
import ViewRuleModal from "../ModalViewRule";
import { RuleApi } from "../../../apis/rule";
type Props = {
  filter: FilterLogType;
  setFilter: (filter: FilterLogType) => void;
}
type RuleSelected = {
  rule_id: string;
  rule_file: string;
}
const HistoryProtectTable: FC<Props> = ({ filter }) => {
  const [params, setParams] = useState<CommonGetAllParams>({
    number: 10,
    page: 1,
  });
  const [selectedRemoteAddr, setSelectedRemoteAddr] = useState<string>("");
  const [selectedRule, setSelectedRule] = useState<RuleSelected>({ rule_file: "", rule_id: "" });
  const [isOpenRuleCntModal, setIsOpenRuleCntModal] = useState<boolean>(false);
  const [isOpenAttackerMapModal, setIsOpenAttackerMapModal] = useState<boolean>(false);
  const { data, isLoading, error, mutate } = useHistoryProtect(params, filter);
  const getFIleName = () => {
    const currentTime = new Date().getTime();
    const fileName = `modseclogs_${currentTime}t${filter.time}`
    return fileName;
  }
  const handleExport = async () => {
    try {
      const response = await LogsApi.exportExcell(filter);
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

  const closeAttackerMapModalHandler = () => {
    setIsOpenAttackerMapModal(false);
  }
  const closeRuleCntModalHandler = () => {
    setIsOpenRuleCntModal(false)
  }
  const openRuleCntModalHandler = (rule_file: string, rule_id: string) => {
    setSelectedRule({ rule_file: rule_file, rule_id: rule_id })
    setIsOpenRuleCntModal(true);
  }
  const handleViewLocation = (remote_address: string) => {
    setIsOpenAttackerMapModal(true);
    setSelectedRemoteAddr(remote_address);
  };

  const removeRuleHandler = async (rule_file: string, rule_id: string) => {
    try {
      const res = await RuleApi.deleteRuleCRS({ rule_file, id_rule: rule_id })
      if (res.status === 200) message.success("Removed rule successfully")
      else message.error("Removed rule failed")
    } catch (error) {
      message.error("Removed rule failed")
    }
  }
  const handleAddToBlacklist = async (remote_address: string) => {
    // Implement add to blacklist logic here
    try {
      const res = await RuleApi.addIPToBlacklist({ ip_address: remote_address })
      if (res.status === 200) message.success("Added IP to backlist successfully")
      else message.error("Added IP to blacklist failed")
    } catch (error) {
      message.error("Added IP to blacklist failed")
    }
  };
  const contextMenuRemoteAddr = (remote_address: string) => (
    <Menu>
      <Menu.Item key="viewLocation" onClick={() => handleViewLocation(remote_address)}>
        View location
      </Menu.Item>
      <Menu.Item key="addToBlacklist" onClick={() => handleAddToBlacklist(remote_address)}>
        Add to blacklist
      </Menu.Item>
    </Menu>
  );

  const contextMenuViewRule = (record: any) => (
    <Menu>
      <Menu.Item key="viewLocation" onClick={() => openRuleCntModalHandler(record.message_rule_file, record.message_rule_id)}>
        View rule
      </Menu.Item>
      <Menu.Item key="addToBlacklist" onClick={() => removeRuleHandler(record.message_rule_file, record.message_rule_id)}>
        Remove rule
      </Menu.Item>
    </Menu>
  );


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
      dataIndex: "event_time",
      align: "left",
      width: "15%",
      render: (event_time) => (
        <Tooltip title={event_time}>
          <div className="inline-text">{dayjs(event_time).format('ddd MMM D YYYY HH:mm:ss')}</div>
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
        <Dropdown overlay={contextMenuRemoteAddr(remote_address)} trigger={['contextMenu']}>
          <Tooltip title={remote_address}>
            <div className="inline-text remote_address-text"><u>{remote_address}</u></div>
          </Tooltip>
        </Dropdown>
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
      title: "Message rule file",
      dataIndex: "message_rule_file",
      align: "left",
      render: (message_rule_file) => (
        <Tooltip title={message_rule_file}>
          <div className="inline-text">{message_rule_file}</div>
        </Tooltip>
      ),
    },
    {
      key: 9,
      title: "Rule mapped",
      dataIndex: "message_rule_id",
      align: "left",
      render: (message_rule_id, record: any) => (
        <Dropdown overlay={contextMenuViewRule(record)} trigger={['contextMenu']}>
          <Tooltip title={message_rule_id}>
            <div className="inline-text remote_address-text"><u>{message_rule_id}</u></div>
          </Tooltip>
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <Card className="card-container" size="small">
        <Space style={{ justifyContent: "space-between", display: "flex" }}>
          <CardTitleCustom title="History Protect" />
          <Button icon={<Excell />}
            style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', padding: "0px 6px" }}
            onClick={handleExport}
          >Export excell</Button>
        </Space>
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
      <ViewRuleModal isOpenModal={isOpenRuleCntModal} closeModal={closeRuleCntModalHandler} rule_id={selectedRule.rule_id} rule_file={selectedRule.rule_file} />
      {selectedRemoteAddr ? <AttackerMap isOpenModal={isOpenAttackerMapModal} closeModal={closeAttackerMapModalHandler} remoteAddr={selectedRemoteAddr} />
        : <></>}
    </div>
  );
};

export default HistoryProtectTable;
