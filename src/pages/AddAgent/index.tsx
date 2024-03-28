import React, { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { USER_MANAGEMENT } from "../../routes/route.constant";
import { setSelectedBreadCrumb } from "../App/store/appSlice";
import { Form, Input, Select, Space, Steps, Switch, Typography, message } from "antd";
import ButtonCustom from "../../components/ButtonCustom";
import { AgentType } from "../../constants/types/agent.type";
import { agentApi } from "../../apis/agent";
import { useForm } from "antd/es/form/Form";
type dataAddRaw = {
    ServerName: string,
    IPAgent: string,
    Protocol: string,
    AgentPort: number,
    ServerPort: string,
    ProxyPreserveHost: boolean,
    ErrorDocument: string
}

const AddAgent = () => {
    const dispatch = useDispatch();
    const [form] = useForm();
    useEffect(() => {
        let breadCrumb = [
            {
                label: "User management",
                path: USER_MANAGEMENT
            },
            {
                label: "Add",
                path: ""
            }
        ]
        dispatch(setSelectedBreadCrumb(breadCrumb))
    }, [USER_MANAGEMENT])
    const configAgentItem = <>
        <Form.Item
            label="Agent server name"
            name="ServerName"
            rules={[{ required: true }]}
        >
            <Input placeholder="www.dvwa.com" />
        </Form.Item>
        <Space style={{ width: '100%' }} className="addAgentConfig-server-wrapper">
            <Form.Item
                label="IP Agent"
                name="IPAgent"
                rules={[{ required: true }]}
            >
                <Input placeholder="192.168.157.139" className="addAgentConfig-input" />
            </Form.Item>
            <Form.Item
                label="Agent Port"
                name="AgentPort"
                rules={[{ required: true }]}
            >
                <Input placeholder="6565" />
            </Form.Item>
        </Space>
        <Form.Item label="Protocol"
            rules={[{ required: true }]}
            name="Protocol"
        >
            <Select placeholder="http/https" style={{ width: '49.5%' }}>
                <Select.Option value="http">http</Select.Option>
                <Select.Option value="https">https</Select.Option>
            </Select>
        </Form.Item>
    </>
    const configHostItem = <>
        <Space style={{ width: '100%' }} className="addAgentConfig-server-wrapper">

            <Form.Item label="Proxy preserve host"
                name="ProxyPreserveHost"
            >
                <Switch />
            </Form.Item>
            <Form.Item
                label="Server Port"
                name="ServerPort"
                rules={[{ required: true }]}
            >
                <Input placeholder="80" />
            </Form.Item>
        </Space>
        <Form.Item
            label="Error document"
            name="ErrorDocument"
            rules={[{ required: true }]}
        >
            <Input placeholder="/403.html" />
        </Form.Item>
    </>
    const addAgentHandler = async (value: dataAddRaw) => {
        const dataAddAgent: AgentType = {
            Port: value.ServerPort,
            ServerName: value.ServerName,
            ProxyPreserveHost: value.ProxyPreserveHost ? "On" : "Off",
            ProxyPass: `${value.Protocol}://${value.IPAgent}:${value.AgentPort}/`,
            ProxyPassReverse: `${value.Protocol}://${value.IPAgent}:${value.AgentPort}/`,
            ErrorDocument: value.ErrorDocument,
            Protocol: value.Protocol
        }
        try {
            const res = await agentApi.add(dataAddAgent);
            if (res.status === 200) {
                message.success(res.data.message);
                form.resetFields();
            }
            else message.error("Add agent fail")
        } catch (error) {
            message.error("Add agent fail")
        }
    }
    return (
        <div className="container-wrapper">
            <Typography className="addAgent-title" style={{marginBottom: '10px', fontSize: '1.5rem'}}>Add Agent</Typography>
            <Form layout="vertical" onFinish={addAgentHandler} form={form}>
                <Steps
                    direction="vertical"
                    size="small"
                    className="Steps-addAgent"
                    items={[
                        {
                            title: 'Configuration agent',
                            status: 'process',
                            description: configAgentItem
                        },
                        {
                            title: 'Configuration server',
                            status: 'process',
                            description: configHostItem
                        },

                    ]}
                />
                <Space style={{ justifyContent: "end", width: "100%" }}>
                    <ButtonCustom
                        label="Add"
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
export default AddAgent;
