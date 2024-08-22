import React, { FC } from "react";
import "./style.scss";
import { Form, Input, Modal, Typography, message } from "antd";
import { useForm } from "antd/es/form/Form";
import ButtonCustom from "../../../components/ButtonCustom";

type Props = {
    isOpenModal: boolean;
    closeModal: () => void;
}

const AddIPModal: FC<Props> = ({ isOpenModal, closeModal }) => {
    const [form] = useForm();
    const onFinish = async (value:any) => {
        console.log(value);
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
                    name={"IP"}
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
