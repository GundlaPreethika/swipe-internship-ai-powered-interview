import React from "react";
import { Tabs, Layout } from "antd";
import ResumeUploader from "./components/ResumeUploader";
import ChatInterview from "./components/ChatInterview";
import InterviewerDashboard from "./components/InterviewerDashboard";

const { Header, Content } = Layout;

export default function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ color: "#fff", fontSize: 20 }}>
        Swipe — AI Interview Assistant
      </Header>
      <Content style={{ padding: 20 }}>
        <Tabs
          defaultActiveKey="interviewee"
          items={[
            {
              key: "interviewee",
              label: "Interviewee (Chat)",
              children: (
                <div style={{ maxWidth: 900, margin: "0 auto" }}>
                  <ResumeUploader />
                  <ChatInterview />
                </div>
              ),
            },
            {
              key: "interviewer",
              label: "Interviewer (Dashboard)",
              children: <InterviewerDashboard />,
            },
          ]}
        />
      </Content>
    </Layout>
  );
}
