import React, { FC, useEffect, useState } from "react";
import "./style.scss";
import { message, Modal, Typography } from "antd";
import { RuleApi } from "../../../apis/rule";
import TextArea from "antd/es/input/TextArea";


type Props = {
    isOpenModal: boolean;
    closeModal: () => void;
    rule_id: string;
    rule_file: string;
}

const ViewRuleModal: FC<Props> = ({ isOpenModal, closeModal, rule_id, rule_file }) => {    
    const [contentRule, setContentRule] = useState("");
    const fetchContentRule = async () => {
        try {
            const res = await RuleApi.getContentRule({ rule_file: rule_file, id_rule: rule_id });
            if (res.status === 200) {
                setContentRule(res.data)
            } else message.error("Get content rule fail");
        } catch (error) {
            // message.error("Get content rule fail");
        }
    }
    useEffect(() => {
        fetchContentRule();
    },[rule_file, rule_id])
    return (
        <Modal
            open={isOpenModal}
            closable={true}
            footer={null}
            onCancel={closeModal}
            style={{ display: "flex", justifyContent: "center" }}
            className="modalEditAgent-wrapper"
        >
            <Typography className="addAgent-title">View Rule {rule_id} - {rule_file}</Typography>
            <TextArea value={contentRule} rows={20} readOnly/>
        </Modal>
    );
}
export default ViewRuleModal;
