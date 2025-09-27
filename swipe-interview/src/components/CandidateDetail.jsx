import React from 'react';
import { Card, List } from 'antd';

export default function CandidateDetail({ candidate }) {
  return (
    <>
      <Card title="Profile" style={{ marginBottom: 10 }}>
        <p><b>Name:</b> {candidate.name}</p>
        <p><b>Email:</b> {candidate.email}</p>
        <p><b>Phone:</b> {candidate.phone}</p>
        <p><b>Final Score:</b> {candidate.finalScore}</p>
        <p><b>Summary:</b> {candidate.summary}</p>
      </Card>
      <Card title="Chat History">
        <List
          dataSource={candidate.chat}
          renderItem={(c, i) => (
            <List.Item key={i}>
              <div>
                <b>Q:</b> {c.question} <br />
                <b>A:</b> {c.answer} <br />
                <small>{c.difficulty} | Auto: {c.auto ? 'Yes' : 'No'}</small>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </>
  );
}
