import React, { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { RULE_MANAGEMENT } from "../../routes/route.constant";
import { setSelectedBreadCrumb } from "../App/store/appSlice";
import { Form, Input, Space, Typography, message } from "antd";
import ButtonCustom from "../../components/ButtonCustom";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
const AddFileRuleConfig = () => {
    const dispatch = useDispatch();
    const [dataRuleFileChange, setDataRuleFileChange] = useState("");
    const [form] = useForm();
    useEffect(() => {
        let breadCrumb = [
            {
                label: "Rule Management",
                path: RULE_MANAGEMENT
            },
            {
                label: "Create File Config",
                path: ""
            }
        ]
        dispatch(setSelectedBreadCrumb(breadCrumb))
    }, [RULE_MANAGEMENT])

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
    const handleChangeRuleFile = (e: any) => {
        console.log(e.target.value);
        setDataRuleFileChange(e.target.value);
    }
    return (
        <div className="container-wrapper">
            <Typography className="addFileRule-title" style={{ marginBottom: '10px', fontSize: '1.5rem' }}>Create file rule config</Typography>
            <Form form={form} layout="vertical" className="add-fileRule-form">
                <Form.Item
                    label="File name"
                    name="file_name"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="quandoanx.conf" />
                </Form.Item>
                <Form.Item
                    label="File content"
                    name="rules"
                    rules={[{ required: true }]}
                >
                    <TextArea rows={18} value={dataRuleFileChange} onChange={handleChangeRuleFile} onKeyUp={handleCommandKey} />
                </Form.Item>
                <Space style={{ justifyContent: "end", width: "100%", padding: "10px 0" }}>
                    <ButtonCustom
                        label="Create"
                        bgColor="#2862AF"
                        type="primary"
                        htmlType="submit"
                        onClick={() => { }}
                    />
                </Space>
            </Form>
        </div>
    );
}
export default AddFileRuleConfig;
