import React, { useState } from 'react';
import { Container } from 'reactstrap';
import SplitPane from 'react-split-pane';
import Sidebar from '../../components/Sidebar';
import TaskList from '../../components/TaskList';
import Chatbot from '../../components/Chatbot';
import TopNavBar from '../../components/TopNavBar';
import DocumentSummary from '../../components/DocumentSummary'; // Import the new DocumentSummary component

export default function LawyerOneStop() {
  const [tasks, setTasks] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(tasks[0]); // Select first task by default
  const [selectedChunk, setSelectedChunk] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSummaryCollapsed, setIsSummaryCollapsed] = useState(false); // State for summary collapse

  const sidebarWidth = isSidebarCollapsed ? '0px' : '250px';

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleSummary = () => {
    setIsSummaryCollapsed(!isSummaryCollapsed);
  };

  return (
    <Container
      fluid
      style={{
        height: '100vh',
        margin: 0,
        padding: 0,
        backgroundColor: '#e3f2fd', // Full background is light blue, similar to Google’s design
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TopNavBar /> {/* Top navigation bar */}

      {/* Sidebar overlay */}
      <div
        style={{
          position: 'fixed', // Fixed positioning to ensure it remains in place
          top: 0,
          left: 0,
          height: '100vh', // Full height matching the viewport
          width: sidebarWidth,
          backgroundColor: '#ffffff', // Sidebar remains white for contrast
          zIndex: 1000,
          transition: 'width 0.3s ease',
          boxShadow: '2px 0 12px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
      </div>

      {/* Tiny toggle button for sidebar */}
      <button
        onClick={toggleSidebar}
        style={{
          position: 'fixed',
          top: '50%',
          left: isSidebarCollapsed ? '0px' : '255px',
          zIndex: 1100,
          padding: '2px 5px',
          backgroundColor: '#64b5f6', // A medium blue for contrast with the light background
          color: '#fff',
          border: 'none',
          borderRadius: '10%',
          fontSize: '12px',
          lineHeight: '1',
          cursor: 'pointer',
          transform: 'translateY(-50%)', // Centers the button vertically
          transition: 'left 0.3s ease',
        }}
      >
        {isSidebarCollapsed ? '>' : '<'}
      </button>

      {/* Main content */}
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', marginLeft: sidebarWidth }}>
        <SplitPane
          split="vertical"
          defaultSize="40%"
          minSize="30%"
          maxSize="70%"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#ffffff', // Main content remains white for readability
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', // Softer shadow for a clean look
          }}
        >
          {/* Left pane (Task List and Document Info) */}
          <div
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              padding: '20px',
            }}
          >
            {/* TaskList Area with Scrollable Content */}
            <div
              style={{
                flexGrow: 1, // Adjusts dynamically based on available height
                overflowY: 'auto', // Scrollable with visible scrollbar
                paddingRight: '10px',
                marginBottom: '10px', // Space above the summary area
              }}
            >
              <TaskList
                tasks={tasks}
                setTasks={setTasks}
                setSelectedDocument={setSelectedDocument}
                setSelectedChunk={setSelectedChunk}
              />
            </div>

            {/* Document Summary Component */}
            <DocumentSummary
              isSummaryCollapsed={isSummaryCollapsed}
              toggleSummary={toggleSummary}
              selectedDocument={selectedDocument}
            />
          </div>


          {/* Right pane (Chatbot) */}
          <div
            style={{
              borderLeft: '1px solid #e0e0e0',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              padding: '20px',
              backgroundColor: '#ffffff', // Keep the Chatbot section white for consistency
            }}
          >
            <Chatbot />
          </div>
        </SplitPane>
      </div>
    </Container>
  );
}
