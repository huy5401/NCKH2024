import React, { FC, useEffect, useState } from "react";
import {
  Form, Space, message,
} from "antd";
import "./style.scss";
import TextArea from "antd/es/input/TextArea";
import ButtonCustom from "../../components/ButtonCustom";
import { RuleApi } from "../../apis/rule";
import { RULE_FILE_DETAILS, RULE_MANAGEMENT } from "../../routes/route.constant";
import { setSelectedBreadCrumb } from "../App/store/appSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";


const FileRuleConfigDetail = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataRuleFile, setDataRuleFile] = useState("");
  const [dataRuleFileChange, setDataRuleFileChange] = useState("");
  const dispatch = useDispatch();
  const {id:fileName} = useParams();
  useEffect(() => {
    let breadCrumb = [
      {
        label: "Rule management",
        path: RULE_MANAGEMENT
      },
      {
        label: "Rule File Detail",
        path: ""
      }
    ]
    dispatch(setSelectedBreadCrumb(breadCrumb))
  }, [RULE_FILE_DETAILS])
  const handleCommandKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === '/' && e.ctrlKey) {
      e.preventDefault();
      const textArea = e.target as HTMLTextAreaElement;
      const selectionStart = textArea.selectionStart || 0;
      const selectionEnd = textArea.selectionEnd || 0;
      // Lấy vị trí dấu xuống dòng trước và sau vùng được bôi đen
      const startLineIndex = dataRuleFileChange.lastIndexOf('\n', selectionStart - 1) + 1;
      const endLineIndex = dataRuleFileChange.indexOf('\n', selectionEnd);

      // Lấy dòng vừa bôi đen
      const selectedLines = dataRuleFileChange.substring(startLineIndex, endLineIndex !== -1 ? endLineIndex : undefined);
      // Thêm dấu "#" vào đầu dòng, kiểm tra nếu đã có dấu '#' thì sẽ bỏ đi
      const modifiedLines = selectedLines.split('\n').map(line => {
        if (line.trim().startsWith('#')) return line.replace('#', '')
        else return '#' + line
      }).join('\n');
      const updateddataRuleFileChange = dataRuleFileChange.substring(0, startLineIndex) + modifiedLines + dataRuleFileChange.substring(endLineIndex !== -1 ? endLineIndex : dataRuleFileChange.length);
      setDataRuleFileChange(updateddataRuleFileChange);
    }
  }

  const fetchDataRuleFile = async () => {
    setIsLoading(true);
    try {
      const res = await RuleApi.getContentFileRule({ rule_name: fileName });
      if (res.status === 200) {
        setDataRuleFile(res.data);
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
    if (dataRuleFile) {
      setDataRuleFileChange(dataRuleFile)
    }
  }, [dataRuleFile])
  useEffect(() => {
    fetchDataRuleFile();
  }, [])
  const handleChangeRuleFile = (e: any) => {
    console.log(e.target.value);
    setDataRuleFileChange(e.target.value);
  }
  const handleUpdate = async () => {
    const data: any = {
      name: fileName,
      rules: dataRuleFileChange
    }
    setIsLoading(true);
    try {
      const res = await RuleApi.updateRuleFileContent(data);
      if (res.status === 200) {
        message.success("Update rule file successfully");
        setIsLoading(false);
        fetchDataRuleFile();
      } else {
        message.error("Update rule file failed");
      }
    } catch (error) {
      message.error("Update rule file failed");
      setIsLoading(false);
    }
  }
  const handleCancel = () => {
    setIsEdit(false);
    setDataRuleFileChange(dataRuleFile);
  }
  return (
    <div className="container-wrapper">
      <div style={{fontSize: "18px", fontWeight: 600, paddingBottom: "10px"}}>{`${fileName}.conf`}</div>
      <Form>
        <TextArea rows={20} value={dataRuleFileChange} onChange={handleChangeRuleFile} readOnly={!isEdit} onKeyUp={handleCommandKey} />
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

export default FileRuleConfigDetail;
