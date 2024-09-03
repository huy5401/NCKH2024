import React, { FC } from "react";
import "./style.scss";
import { Form, Input, Modal, Typography, message } from "antd";
import { useForm } from "antd/es/form/Form";
import ButtonCustom from "../../../components/ButtonCustom";
import { RuleApi } from "../../../apis/rule";

type Props = {
    isOpenModal: boolean;
    closeModal: () => void;
    mutate: () => void;
}

const AddIPModal: FC<Props> = ({ isOpenModal, closeModal, mutate }) => {
    const [form] = useForm();
    const onFinish = async (value:any) => {
        try {
            const res = await RuleApi.addIPToBlacklist(value);
            if(res.status === 200){
                mutate();
                message.success("Added ip to blacklist successfully");
                closeModal();
            }else message.error("Added ip to blacklist failed");
        } catch (error) {
            message.error("Added ip to blacklist failed");
        }
    }
    return (
        <Modal
            open={isOpenModal}
            closable={false}
            footer={null}
            onCancel={closeModal}
            style={{ display: "flex", justifyContent: "center" }}
            className="modalEditAgent-wrapper"
        >
            <Typography className="addAgent-title">Add Block IP</Typography>
            <Form layout="vertical" onFinish={onFinish} form={form}>
                <Form.Item
                    label="IP Block"
                    name={"ip_address"}
                    rules={[{ required: true }]}
                >
                    <Input placeholder="192.168.131.1" />
                </Form.Item>

                <div style={{ display: "flex", justifyContent: "end" }}>
                    <ButtonCustom
                        label="Cancel"
                        onClick={() => {
                            form.resetFields();
                            closeModal();
                        }}
                        style={{ marginRight: "5px" }}
                    />
                    <ButtonCustom
                        label="Add"
                        bgColor="#1677ff"
                        type="primary"
                        htmlType="submit"
                    />
                </div>
            </Form>
        </Modal>
    );
}
export default AddIPModal;
