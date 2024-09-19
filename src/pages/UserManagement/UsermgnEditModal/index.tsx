import React, { FC, useEffect, useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { Flex, Form, Input, Modal, Select, Space, Steps, Switch, Typography, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { agentApi } from "../../../apis/agent";
import ButtonCustom from "../../../components/ButtonCustom";
import { AgentType } from "../../../constants/types/agent.type";
import { useFormik } from "formik";
type dataAddRaw = {
    ServerName: string,
    IPAgent: string,
    Protocol: string,
    AgentPort: string,
    ServerPort: number,
    ProxyPreserveHost: boolean,
    ErrorLog: string,
    ErrorDocument: string
}
type Props = {
    isOpenModal: boolean;
    closeModal: () => void;
    agent: AgentType;
    mutate: () => void;
}

const EditAgentModal: FC<Props> = ({ isOpenModal, closeModal, agent, mutate }) => {
    const [isLoading, setIsLoading] = useState(false);
    const form = useFormik({
        initialValues: {
            id: agent.id,
            Port: agent.Port,
            ServerName: agent.ServerName,
            ProxyPreserveHost: agent.ProxyPreserveHost,
            ProxyPass: agent.ProxyPass,
            ProxyPassReverse: agent.ProxyPassReverse,
            ErrorLog: agent.ErrorLog,
            ErrorDocument: agent.ErrorDocument,
            Protocol: agent.Protocol,
            SecRuleEngine: agent.SecRuleEngine,
            SSLEngine: agent.SSLEngine
        } as AgentType,
        onSubmit: async (data: AgentType) => {
            try {
                setIsLoading(true);
                const dataUpdate = {
                    id: data.id,
                    ProxyPreserveHost: data.ProxyPreserveHost,
                    ProxyPass: data.ProxyPass,
                    ProxyPassReverse: data.ProxyPassReverse,
                    ErrorLog: data.ErrorLog,
                    ErrorDocument: data.ErrorDocument,
                    Protocol: data.Protocol,
                    SSLEngine : data.SSLEngine
                    // SecRuleEngine: data.SecRuleEngine
                }
                const res = await agentApi.update(dataUpdate);
                if (res.status === 200) {
                    message.success(res.data.message);
                    mutate();
                    closeModal();
                }
                else message.error("Updated failed");
            } catch (error) {
                message.error("Updated failed")
            }
            setIsLoading(false);
        }
    })
    useEffect(() => {
        if (agent) {
            form.setValues(agent);
        }
    }, [agent])
    const configAgentItem = <>
        <Form.Item
            label="Website server name"
            rules={[{ required: true }]}
        >
            <Input placeholder="www.dvwa.com"
                value={form.values.ServerName}
                disabled
            />
        </Form.Item>
        <Space style={{ width: '100%' }} className="addAgentConfig-server-wrapper">
            <Form.Item
                label="IP Website"
                rules={[{ required: true }]}
            >
                <Input placeholder="192.168.157.139"
                    className="addAgentConfig-input"
                    value={form.values.ProxyPass?.split('//')[1].split(':')[0]}
                    onChange={(e) => {
                        form.setValues({
                            ...form.values,
                            ProxyPass: `${agent.Protocol}://${e.target.value}:${form.values.ProxyPass?.split('//')[1].split(':')[1]}`,
                            ProxyPassReverse: `${agent.Protocol}://${e.target.value}:${form.values.ProxyPass?.split('//')[1].split(':')[1]}`
                        })
                    }}
                />
            </Form.Item>
            <Form.Item
                label="Website Port"
                rules={[{ required: true }]}
            >
                <Input placeholder="6565"
                    value={form.values.ProxyPass?.split('//')[1].split(':')[1].replace('/', "")}
                    onChange={(e) => {
                        form.setValues({
                            ...form.values,
                            ProxyPass: `${agent.Protocol}://${form.values.ProxyPass?.split('//')[1].split(':')[0]}:${e.target.value}/`,
                            ProxyPassReverse: `${agent.Protocol}://${form.values.ProxyPass?.split('//')[1].split(':')[0]}:${e.target.value}/`
                        })
                    }}

                />
            </Form.Item>
        </Space>
        <Space style={{ width: '100%' }} className="addAgentConfig-server-wrapper">
            <Form.Item label="Protocol"
                rules={[{ required: true }]}
            >
                <Select placeholder="http/https" style={{ width: '100%' }}
                    value={form.values.Protocol}
                    onChange={(e) => {
                        form.setValues({
                            ...form.values, Protocol: e,
                            ProxyPass: `${e}://${form.values.ProxyPass?.split('//')[1].split(':')[0]}:${form.values.ProxyPass?.split('//')[1].split(':')[1]}`,
                            ProxyPassReverse: `${e}://${form.values.ProxyPass?.split('//')[1].split(':')[0]}:${form.values.ProxyPass?.split('//')[1].split(':')[1]}`
                        });
                    }}
                >
                    <Select.Option value="http">http</Select.Option>
                    <Select.Option value="https">https</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="SSL Engine"
            >
                <Switch value={form.values.SSLEngine === "On" ? true : false}
                    onChange={(e) => { form.setValues({ ...form.values, SSLEngine: e ? "On" : "Off" }); }}
                />
            </Form.Item>
        </Space>
    </>
    const configHostItem = <>
        <Space style={{ width: '100%' }} className="addAgentConfig-server-wrapper">
            <Form.Item label="Proxy preserve host"
            >
                <Switch value={form.values.ProxyPreserveHost === "On" ? true : false}
                    onChange={(e) => { form.setValues({ ...form.values, ProxyPreserveHost: e ? "On" : "Off" }); }}
                />
            </Form.Item>
            <Form.Item
                label="Server Port"
                rules={[{ required: true }]}
            >
                <Input placeholder="80" value={form.values.Port}
                    disabled
                />
            </Form.Item>
        </Space>
        <Form.Item
            label="Error log"
            rules={[{ required: true }]}
        >
            <Input placeholder="/var/log/apache2/errors_80.log"
                className="addAgentConfig-input"
                value={form.values.ErrorLog}
                onChange={(e) => { form.setValues({ ...form.values, ErrorLog: e.target.value }); }}

            />
        </Form.Item>
        <Form.Item
            label="Error document"
            rules={[{ required: true }]}
        >
            <Input placeholder="/403.html" value={form.values.ErrorDocument}
                onChange={(e) => { form.setValues({ ...form.values, ErrorDocument: e.target.value }); }}
            />
        </Form.Item>
    </>
    return (
        <Modal
            open={isOpenModal}
            closable={false}
            footer={null}
            onCancel={closeModal}
            style={{ display: "flex", justifyContent: "center" }}
            className="modalEditAgent-wrapper"
        >
            <Typography className="addAgent-title">Edit Website</Typography>
            <Form layout="vertical">
                <Steps
                    direction="horizontal"
                    size="small"
                    className="Steps-addAgent"
                    items={[
                        {
                            title: 'Configuration website',
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

                <div style={{ display: "flex", padding: "0 15px 15px 15px", justifyContent: "end" }}>
                    <ButtonCustom
                        label="Cancel"
                        onClick={() => closeModal()}
                        style={{ marginRight: "5px" }}
                    />
                    <ButtonCustom
                        label="Save"
                        bgColor="#1677ff"
                        type="primary"
                        htmlType="submit"
                        onClick={form.submitForm}
                        loading={isLoading}
                    />
                </div>
            </Form>
        </Modal>
    );
}
export default EditAgentModal;
