// DocumentItem.jsx
import React from 'react';
import { Button, Collapse, CardBody } from 'reactstrap';
import SummaryList from './SummaryList';

export default function DocumentItem({
  doc,
  docIndex,
  taskIndex,
  tasks,
  setTasks,
  setSelectedDocument,
  setSelectedChunk,
}) {
  const toggleDocument = () => {
    setTasks(
      tasks.map((task, i) => {
        if (i === taskIndex) {
          const updatedDocuments = task.documents.map((d, j) =>
            j === docIndex ? { ...d, isOpen: !d.isOpen } : d
          );
          return { ...task, documents: updatedDocuments };
        }
        return task;
      })
    );
    setSelectedDocument(doc);
    setSelectedChunk(null);
  };

  return (
    <div>
      <Button
        color="link"
        onClick={toggleDocument}
        style={{
          textAlign: 'left',
          width: '100%',
          padding: '5px 0',
          fontSize: '14px',
        }}
      >
        {doc.isOpen ? '▼' : '▶'} {doc.name}
      </Button>
      <Collapse isOpen={doc.isOpen}>
        <CardBody style={{ paddingLeft: '20px' }}>
          <SummaryList
            summaries={doc.summaries}
            setSelectedChunk={setSelectedChunk}
          />
        </CardBody>
      </Collapse>
    </div>
  );
}
