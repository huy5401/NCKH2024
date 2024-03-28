import React, { FC, useEffect, useRef, useState } from "react";
import {
  Form, Space, Spin, message,
} from "antd";
import "./style.scss";
import TextArea from "antd/es/input/TextArea";
import RulesTable from "./RulesTable";
import ButtonCustom from "../../components/ButtonCustom";
import Icons from "../../assets/icons";
import { AgentType } from "../../constants/types/agent.type";
import { RuleApi } from "../../apis/rule";
import { UpdateRuleType } from "../../constants/types/rules.type";

type Props = {
  agentData: AgentType;
}
const Rules: FC<Props> = ({ agentData }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataRule, setDataRule] = useState("");
  const [dataRuleChange, setDataRuleChange] = useState("");
  const listRuleAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleCommandKey = (e: any) => {
    if (e.key === '/' && e.ctrlKey) {
      e.preventDefault();
      insertHashAtBeginning();
    }
  }   
  const insertHashAtBeginning = () => {
    const textarea = listRuleAreaRef.current;
    if (!textarea) return;

    const selectionStart = textarea.selectionStart;
    console.log(selectionStart);
    
    // const selectionEnd = textarea.selectionEnd;

    // const lines = textarea.value.split('\n');
    // const modifiedLines = lines.map((line, index) => {
    //   if (index >= selectionStart && index < selectionEnd) {
    //     return '#' + line;
    //   }
    //   return line;
    // });

    // const modifiedText = modifiedLines.join('\n');
    // textarea.value = modifiedText;
  }
  const fetchDataRule = async () => {
    setIsLoading(true);
    try {
      const res = await RuleApi.getByServername({ ServerName: agentData.ServerName });
      if (res.status === 200) {
        setDataRule(res.data);
        setIsLoading(false);
      } else {
        message.error("Get rule error");
      }
    } catch (error) {
      message.error("Get rule error");
      setIsLoading(false);
    }
  }
  useEffect(() => {
    if (dataRule) {
      setDataRuleChange(dataRule)
    }
  }, [dataRule])
  useEffect(() => {
    fetchDataRule();
  }, [])
  const handleChangeRule = (e: any) => {
    console.log(e.target.value);
    setDataRuleChange(e.target.value);
  }
  const handleUpdate = async () => {
    const data: UpdateRuleType = {
      ServerName: agentData.ServerName,
      rules: dataRuleChange
    }
    setIsLoading(true);
    try {
      const res = await RuleApi.update(data);
      if (res.status === 200) {
        message.success(res.data.message);
        setIsLoading(false);
        fetchDataRule();
      } else {
        message.error("Update rule fail");
      }
    } catch (error) {
      message.error("Update rule fail");
      setIsLoading(false);
    }
  }
  const handleCancel = () => {
    setIsEdit(false);
    setDataRuleChange(dataRule);
  }
  return (
    <div><Form>
      <TextArea ref={listRuleAreaRef} rows={20} value={dataRuleChange} onChange={handleChangeRule} disabled={!isEdit} onKeyDown={handleCommandKey}/>
      <Space style={{ display: "flex", justifyContent: "end" }}>
        {
          isEdit ? <> <ButtonCustom
            size="small"
            onClick={handleCancel}
            label="Cancel"
            disabled={isLoading}
            style={{ margin: "10px 0" }}
          />
            <ButtonCustom
              type="primary"
              size="small"
              onClick={handleUpdate}
              label="Save"
              loading={isLoading}
              style={{ margin: "10px 0" }}
            /></> : <ButtonCustom
            type="primary"
            size="small"
            onClick={() => setIsEdit(true)}
            label="Update"
            loading={isLoading}
            style={{ margin: "10px 0" }}
          />
        }

      </Space>
    </Form>
      {/* <RulesTable /> */}
    </div>
  );
};

export default Rules;
