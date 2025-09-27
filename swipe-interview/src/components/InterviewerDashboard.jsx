import React from "react";
import { Card, List } from "antd";

export default function InterviewerDashboard() {
  const candidates = [
    { name: "Alice", email: "alice@example.com", score: 85 },
    { name: "Bob", email: "bob@example.com", score: 72 },
  ];

  return (
    <div>
      <h2>Interviewer Dashboard</h2>
      <List
        dataSource={candidates}
        renderItem={(c) => (
          <Card style={{ marginBottom: 10 }}>
            <p><strong>Name:</strong> {c.name}</p>
            <p><strong>Email:</strong> {c.email}</p>
            <p><strong>Score:</strong> {c.score}</p>
          </Card>
        )}
      />
    </div>
  );
}
