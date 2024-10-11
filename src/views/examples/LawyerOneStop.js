import React, { useState } from 'react';
import { Container } from 'reactstrap';
import SplitPane from 'react-split-pane';
import Sidebar from '../../components/Sidebar'; // Sidebar with collapsible logic
import TaskList from '../../components/TaskList';
import Chatbot from '../../components/Chatbot';
import TopNavBar from '../../components/TopNavBar'; // Top nav component

export default function LawyerOneStop() {
  const [tasks, setTasks] = useState([
    { name: 'Task 1', status: 'Working on it', dueDate: 'Oct 10', content: 'Details for Task 1' },
    { name: 'Task 2', status: 'Done', dueDate: 'Oct 11', content: 'Details for Task 2' },
    { name: 'Task 3', status: 'Stuck', dueDate: 'Oct 12', content: 'Details for Task 3' },
  ]);
  const [selectedDocument, setSelectedDocument] = useState(tasks[0]); // Select first task by default
  const [selectedChunk, setSelectedChunk] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Collapsible sidebar state

  return (
    <Container fluid style={{ height: '100vh', margin: 0, padding: 0 }}>
      <TopNavBar /> {/* Top navigation bar */}
      <div style={{ display: 'flex', height: '100%' }}>
        {/* Sidebar with collapsible functionality */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />

        {/* Middle and Right Panes */}
        <div
          style={{
            flex: 1, // Let this container fill the remaining space
            transition: 'margin-left 0.3s ease', // Smooth transition when the sidebar is collapsed
            marginLeft: isSidebarCollapsed ? '60px' : '250px', // Adjust margin based on sidebar state
            display: 'flex', // Allow split pane content inside
          }}
        >
          <SplitPane split="vertical" defaultSize="50%" minSize="30%" maxSize="70%">
            {/* Middle Pane: Task Management */}
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1, // Allow pane to grow
              }}
            >
              <TaskList
                tasks={tasks}
                setTasks={setTasks}
                setSelectedDocument={setSelectedDocument}
                setSelectedChunk={setSelectedChunk}
              />
              <div
                style={{
                  borderTop: '1px solid #ccc',
                  padding: '10px',
                  height: '150px',
                  overflowY: 'auto',
                }}
              >
                {selectedDocument && selectedDocument.name && (
                  <div style={{ color: 'black' }}>
                    <h5>Selected Document: {selectedDocument.name}</h5>
                    <p>{selectedChunk || selectedDocument.content}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Pane: Chatbot */}
            <div
              style={{
                borderLeft: '1px solid #ccc',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1, // Allow pane to grow
              }}
            >
              <Chatbot />
            </div>
          </SplitPane>
        </div>
      </div>
    </Container>
  );
}
