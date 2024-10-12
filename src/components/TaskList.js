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
    <div style={{
      flex: 1, 
      overflowY: 'auto', 
      position: 'relative', 
      padding: '20px', 
      backgroundColor: '#f7f9fc', 
      borderRadius: '10px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      height: '100%', // Ensures it fills the blob area
      maxHeight: '100%', // Avoids overflow
      display: 'flex',
      flexDirection: 'column', // Ensures TaskItem appears inside the list
      gap: '10px' // Adds consistent spacing between task items
    }}>
      {/* Add New Task Button */}
      <Button
        color="primary"
        onClick={toggleTaskModal}
        style={{
          backgroundColor: '#00c875',
          border: 'none',
          position: 'absolute', // Use absolute positioning within the blob area
          bottom: '20px',
          right: '20px',
          zIndex: 10,
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
      <h4 style={{ 
        marginBottom: '20px', 
        fontSize: '22px', 
        fontWeight: '600', 
        color: '#333', 
        textAlign: 'center' 
      }}>
        Tasks
      </h4>

      {/* Task List Items */}
      <div style={{ 
        overflowY: 'auto', 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '15px' // Ensures spacing between each TaskItem
      }}>
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            taskIndex={index}
            tasks={tasks}
            setTasks={setTasks}
            setSelectedDocument={setSelectedDocument}
            setSelectedChunk={setSelectedChunk}
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
