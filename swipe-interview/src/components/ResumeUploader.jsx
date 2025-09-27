import React, { useState } from "react";
import { Upload, Button, Modal, Form, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function ResumeUploader() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleUpload = (file) => {
    // In real app, you would parse the resume file here
    console.log("Uploaded file:", file);
    setModalOpen(true);
    return false; // prevent auto-upload
  };

  const handleOk = () => {
    console.log("Saved candidate info:", form.getFieldsValue());
    setModalOpen(false);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <Upload beforeUpload={handleUpload} showUploadList={false}>
        <Button icon={<UploadOutlined />}>Upload Resume (PDF/DOCX)</Button>
      </Upload>

      <Modal
        title="Confirm Candidate Info"
        open={modalOpen}
        onOk={handleOk}
        onCancel={() => setModalOpen(false)}
      >
        <Form form={form} layout="vertical" initialValues={{ name: "", email: "", phone: "" }}>
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
