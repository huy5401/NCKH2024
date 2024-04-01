import { Form, Input, Modal, Select, Space, Switch, message } from 'antd'
import React, { useEffect, useState } from 'react';
import ButtonCustom from '../../components/ButtonCustom';
import { useDispatch } from 'react-redux'
import { setSelectedBreadCrumb } from '../App/store/appSlice';
import { useFormik } from 'formik';
import { ConfigType } from '../../constants/types/config.type';
import { ConfigApi } from '../../apis/config';
import './style.scss';
import { RuleApi } from '../../apis/rule';
import * as Yup from 'yup';
import TextArea from 'antd/es/input/TextArea';
type ModeAIType = {
  mode?: "On" | "Off"
}
const Settings = () => {
  const dispatch = useDispatch();
  const [dataConfig, setDataConfig] = useState<ConfigType>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateCRS, setIsUpdateCRS] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [modeAI, setModeAI] = useState<ModeAIType>({});
  // const [fetchValue, setFetchValue] = useState<string>("AAAAAAA \n aaaaaa\n nnnnnn\n dddd");
  // const handlePressKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //   if (e.key === '/' && e.ctrlKey) {
  //     e.preventDefault();
  //     const textArea = e.target as HTMLTextAreaElement;
  //     const selectionStart = textArea.selectionStart || 0;
  //     const selectionEnd = textArea.selectionEnd || 0;
  //     // Lấy vị trí dấu xuống dòng trước và sau vùng được bôi đen
  //     const startLineIndex = fetchValue.lastIndexOf('\n', selectionStart - 1) + 1;
  //     const endLineIndex = fetchValue.indexOf('\n', selectionEnd);

  //     // Lấy dòng vừa bôi đen
  //     const selectedLines = fetchValue.substring(startLineIndex, endLineIndex !== -1 ? endLineIndex : undefined);
  //     // Thêm dấu "#" vào đầu dòng, kiểm tra nếu đã có dấu '#' thì sẽ bỏ đi
  //     const modifiedLines = selectedLines.split('\n').map(line => {
  //       if(line.trim().startsWith('#')) return line.replace('#','')
  //       else return '#' + line
  //     }).join('\n');
  //     const updatedFetchValue = fetchValue.substring(0, startLineIndex) + modifiedLines + fetchValue.substring(endLineIndex !== -1 ? endLineIndex : fetchValue.length);     
  //     setFetchValue(updatedFetchValue);
  //   }
  // }
  const validateSchema = Yup.object().shape({
    SecAuditLogParts: Yup.string()
      .matches(/^[ABDEFHIJZ]+$/, 'Only the characters A, B, D, E, F, H, I, J, Z are allowed to be entered')
      .test('hasAFZ', 'Required to enter A,F,Z', (value: any) =>
        /[AFZ]/i.test(value)
      )
      .min(3, 'Required to enter A,F,Z')
      .required("Please enter this field")
  })
  const fecthConfig = async () => {
    try {
      const res = await ConfigApi.getConfig();
      if (res.status === 200) {
        setDataConfig(res.data)
      } else message.error("Get config error");
    } catch (error) {
      message.error("Get config error");
    }
  }
  const fecthModeAI = async () => {
    try {
      const resModeAI = await RuleApi.getModeAI();
      if (resModeAI.status === 200) setModeAI(resModeAI.data)
      else message.error("Get mode AI error")
    } catch (error) {
      message.error("Get mode AI error")
    }
  }
  useEffect(() => {
    let breadCrumb = [
      {
        label: "Setting",
        path: "",
      }
    ]
    dispatch(setSelectedBreadCrumb(breadCrumb))
  }, [])
  useEffect(() => {
    fecthConfig();
    fecthModeAI();
  }, [])
  useEffect(() => {
    if (dataConfig) {
      form.setValues(dataConfig);
    }
  }, [dataConfig])

  const handleCancel = () => {
    setIsEdit(false);
    form.setValues(dataConfig)
  }
  const handleUpdateCRS = async () => {
    setIsUpdateCRS(true);
    try {
      const res = await RuleApi.updateCRS();
      if (res.status === 200) {
        message.success("Update crs successfully");
        setIsUpdateCRS(false);
      }
    } catch (error) {
      message.error("Update crs fail");
      setIsUpdateCRS(false);
    }
  }
  const handleChangeModeAI = (e: any) => {
    Modal.confirm({
      title: 'Confirm',
      content: 'You definitely want to enable this mode?',
      onOk: async () => {
        try {
          const res = await RuleApi.updateModeAI({ mode: e ? "On" : "Off" });
          if (res.status === 200) message.success("Enable AI mode successfully")
          else {
            message.error("Enable AI mode error");
          }
        } catch (error) {
          message.error("Enable AI mode error");
        }
        fecthModeAI();
      },
      onCancel() {

      },
    });
  }
  const form = useFormik({
    initialValues: {
      SecRuleEngine: dataConfig.SecRuleEngine,
      SecDebugLogLevel: dataConfig.SecDebugLogLevel,
      SecAuditEngine: dataConfig.SecAuditEngine,
      SecAuditLogRelevantStatus: dataConfig.SecAuditLogRelevantStatus,
      SecAuditLogParts: dataConfig.SecAuditLogParts,
      SecAuditLogType: dataConfig.SecAuditLogType,
      SecStatusEngine: dataConfig.SecStatusEngine
    } as ConfigType,
    validationSchema: validateSchema,
    onSubmit: async (data: ConfigType) => {
      setIsLoading(true);
      try {
        const res = await ConfigApi.update(data);
        if (res.status === 200) {
          message.success(res.data.message);
          fecthConfig();
          setIsLoading(false);
        }
        else message.error("Update fail");
      } catch (error) {
        message.error("Update fail")
        setIsLoading(false);
      }
    }
  })
  return (
    <div className='customers-wrapper'>
      <Space style={{ display: "flex", alignItems: "center", marginBottom: '20px' }}>
        <ButtonCustom
          label="UPDATE CRS"
          bgColor="#2862AF"
          type="primary"
          loading={isUpdateCRS}
          onClick={handleUpdateCRS}
        />
        <Form.Item label="AI engine"
          style={{ margin: '0 0 0 20px' }}
        >
          <Switch value={modeAI.mode === "On" ? true : false} onChange={handleChangeModeAI} />
        </Form.Item>
      </Space>
      <Form layout="horizontal" disabled={!isEdit}>
        <Form.Item label="SecRule Engine"
        >
          <Select style={{ width: '100%' }}
            value={form.values.SecRuleEngine}
            onChange={(e) => form.setValues({ ...form.values, SecRuleEngine: e })}
          >
            <Select.Option key={1} value="On">On</Select.Option>
            <Select.Option key={2} value="Off">Off</Select.Option>
            <Select.Option key={3} value="DetectionOnly">DetectionOnly</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="SecDebug Log Level"
          rules={[{ required: true }]}
        >
          <Select style={{ width: '100%' }}
            value={form.values.SecDebugLogLevel}
            onChange={(e) => form.setValues({ ...form.values, SecDebugLogLevel: e })}
          >
            <Select.Option key={1} value="1">Level 1</Select.Option>
            <Select.Option key={2} value="2">Level 2</Select.Option>
            <Select.Option key={3} value="3">Level 3</Select.Option>
            <Select.Option key={4} value="4">Level 4</Select.Option>
            <Select.Option key={5} value="5">Level 5</Select.Option>
            <Select.Option key={6} value="6">Level 6</Select.Option>
            <Select.Option key={7} value="7">Level 7</Select.Option>
            <Select.Option key={8} value="8">Level 8</Select.Option>
            <Select.Option key={9} value="9">Level 9</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="SecAudit Log Relevant Status"
          rules={[{ required: true }]}
          style={{ width: '100%' }}
        >
          <Input placeholder='\"^(?:5|4(?!04))\"'
            value={form.values.SecAuditLogRelevantStatus}
            onChange={(e) => form.setValues({ ...form.values, SecAuditLogRelevantStatus: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          label="SecAudit Log Parts"
          rules={[{ required: true }]}
          style={{ width: '100%' }}
          validateStatus={form.errors.SecAuditLogParts && 'error'}
          help={form.errors.SecAuditLogParts}
        >
          <Input placeholder='ABDEFHIJZ'
            value={form.values.SecAuditLogParts}
            onChange={(e) => { form.setValues({ ...form.values, SecAuditLogParts: e.target.value.toUpperCase() }) }}
            onKeyDown={(e) => {
              const char = e.key.toUpperCase();
              if (form.values.SecAuditLogParts?.includes(char)) {
                e.preventDefault();
              }
            }}
          />
        </Form.Item>
        <Form.Item
          label="SecAudit Log Type"
          rules={[{ required: true }]}
        >
          <Select style={{ width: '100%' }} value={form.values.SecAuditLogType}
            onChange={(e) => { form.setValues({ ...form.values, SecAuditLogType: e }) }}
          >
            <Select.Option key={1} value="Serial">Serial</Select.Option>
            <Select.Option key={2} value="Concurrent">Concurrent</Select.Option>
            <Select.Option key={3} value="Sequential">Sequential</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="SecStatus Engine"
        >
          <Switch value={form.values.SecStatusEngine === "On" ? true : false}
            onChange={(e) => { form.setValues({ ...form.values, SecStatusEngine: e ? "On" : "Off" }); }}
          />
        </Form.Item>
      </Form>

      <Space style={{ justifyContent: "end", width: "100%" }}>
        <Space style={{ display: "flex", justifyContent: "end" }}>
          {
            isEdit ? <>
              <ButtonCustom
                size="small"
                onClick={handleCancel}
                label="Cancel"
                disabled={isLoading}
                style={{ margin: "10px 0" }}
              />

              <ButtonCustom
                type="primary"
                size="small"
                label="Save"
                onClick={form.submitForm}
                loading={isLoading}
                style={{ margin: "10px 0" }}
              />
            </> : <ButtonCustom
              type="primary"
              size="small"
              onClick={() => setIsEdit(true)}
              label="Update"
              loading={isLoading}
              style={{ margin: "10px 0" }}
            />
          }
        </Space>
      </Space>
      {/* <TextArea rows={10} value={fetchValue} onKeyUp={handlePressKey} /> */}
      <ul>
        <li>A: Audit log header (required)</li>
        <li>B: Request headers</li>
        <li>C: Request body (e.g., POST parameters)</li>
        <li>D: Reserved for future use</li>
        <li>E: Reserved for future use</li>
        <li>F: Final boundary, signifies the end of the entry (required)</li>
        <li>G: Reserved for future use</li>
        <li>H: Reserved for future use</li>
        <li>I: Intermediate response headers (these are headers in 4xx-5xx responses by ModSecurity itself, not the application)</li>
        <li>J: Reserved for future use</li>
        <li>K: Reserved for future use</li>
        <li>Z: Final boundary, signifies the end of the entry (required)</li>
      </ul>
    </div>
  )
}

export default Settings