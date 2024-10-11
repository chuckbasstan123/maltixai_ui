// TaskItem.jsx
import React, { useState } from 'react';
import { Button, Collapse, CardBody } from 'reactstrap';
import DocumentList from './DocumentList';
import UploadModal from './UploadModal';

export default function TaskItem({
  task,
  taskIndex,
  tasks,
  setTasks,
  setSelectedDocument,
  setSelectedChunk,
}) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const toggleTask = () => {
    setTasks(
      tasks.map((t, i) =>
        i === taskIndex ? { ...t, isOpen: !t.isOpen } : t
      )
    );
  };

  const toggleUploadModal = () => {
    setIsUploadModalOpen(!isUploadModalOpen);
  };

  const handleUploadFile = (newDocument) => {
    const newDocumentData = {
      name: newDocument.name,
      file: newDocument,
    };

    setTasks(
      tasks.map((t, i) => {
        if (i === taskIndex) {
          return {
            ...t,
            documents: [...t.documents, newDocumentData],
          };
        }
        return t;
      })
    );
    setIsUploadModalOpen(false);
  };

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '15px',
        padding: '15px',
        transition: 'box-shadow 0.2s ease',
      }}
      onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0 3px 8px rgba(0, 0, 0, 0.2)')}
      onMouseOut={(e) => (e.currentTarget.style.boxShadow = '0 1px 4px rgba(0, 0, 0, 0.1)')}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Button
          color="link"
          onClick={toggleTask}
          style={{
            textAlign: 'left',
            width: '100%',
            padding: '10px',
            fontSize: '18px',
            fontWeight: '600', // Make the case name bold
            color: '#000', // Highlight the case name in black
            textDecoration: 'none',
          }}
        >
          {task.isOpen ? '▼' : '▶'} {task.name}
        </Button>
        <Button
          onClick={toggleUploadModal}
          style={{
            backgroundColor: '#f0f0f0',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            padding: '0',
            marginRight: '10px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          }}
        >
          📎
        </Button>
      </div>
      <Collapse isOpen={task.isOpen}>
        <CardBody style={{ paddingLeft: '20px', background: '#fafafa' }}>
          <DocumentList
            documents={task.documents}
            taskIndex={taskIndex}
            tasks={tasks}
            setTasks={setTasks}
            setSelectedDocument={setSelectedDocument}
            setSelectedChunk={setSelectedChunk}
          />
        </CardBody>
      </Collapse>

      <UploadModal
        isOpen={isUploadModalOpen}
        toggle={toggleUploadModal}
        handleUploadFile={handleUploadFile}
      />
    </div>
  );
}
