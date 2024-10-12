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
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        padding: '15px',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        width: '100%' // Ensure it stretches within the TaskList container
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
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
            fontWeight: '600', // Bold task name
            color: '#333', // Darker text for modern look
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
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
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
        >
          📎
        </Button>
      </div>
      <Collapse isOpen={task.isOpen}>
        <CardBody style={{
          paddingLeft: '20px',
          paddingTop: '10px',
          background: '#fafafa',
          borderRadius: '0 0 8px 8px',
        }}>
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
