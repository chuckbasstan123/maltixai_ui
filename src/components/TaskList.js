import React, { useState } from 'react';
import { Button } from 'reactstrap';
import TaskItem from './TaskItem';
import TaskModal from './TaskModal';

export default function TaskList({
  tasks,
  setTasks,
  setSelectedDocument,
  setSelectedChunk,
}) {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const toggleTaskModal = () => {
    setIsTaskModalOpen(!isTaskModalOpen);
  };

  const handleCreateTask = (newTaskName) => {
    if (newTaskName.trim() === '') return;
    const newTask = {
      name: newTaskName,
      isOpen: false,
      documents: [],
    };
    setTasks([...tasks, newTask]);
    setIsTaskModalOpen(false);
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', position: 'relative', padding: '20px' }}>
      {/* Add New Task Button */}
      <Button
        color="primary"
        onClick={toggleTaskModal}
        style={{
          backgroundColor: '#00c875',
          border: 'none',
          position: 'fixed', // Change to fixed to avoid layout issues
          top: '10px',
          right: '10px',
          zIndex: 10, // Ensure it stays above other content
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          fontSize: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#00a75a')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#00c875')}
      >
        +
      </Button>

      {/* Task List Heading */}
      <h4 style={{ marginBottom: '20px', fontSize: '22px', fontWeight: '600', color: '#fff' }}>
        Tasks
      </h4>

      {/* Task List Items */}
      <div style={{ marginTop: '60px' }}>
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            taskIndex={index}
            tasks={tasks}
            setTasks={setTasks}
            setSelectedDocument={setSelectedDocument}
            setSelectedChunk={setSelectedChunk}
            style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '10px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          />
        ))}
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        toggle={toggleTaskModal}
        handleCreateTask={handleCreateTask}
      />
    </div>
  );
}
