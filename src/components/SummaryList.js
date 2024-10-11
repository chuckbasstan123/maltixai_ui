// SummaryList.jsx
import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default function SummaryList({ summaries, setSelectedChunk }) {
  const handleSummaryClick = (chunk) => {
    setSelectedChunk(chunk);
  };

  return (
    <ListGroup>
      {summaries.map((summary, index) => (
        <ListGroupItem
          key={index}
          style={{ color: 'black', cursor: 'pointer' }}
          onClick={() => handleSummaryClick(summary.chunk)}
        >
          {summary.text}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
