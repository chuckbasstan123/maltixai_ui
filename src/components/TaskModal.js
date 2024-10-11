import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import '../styles/TaskModal.css'; // Import your custom CSS styles

export default function TaskModal({ isOpen, toggle, handleCreateTask }) {
  const [newTaskName, setNewTaskName] = useState('');

  const onCreate = () => {
    if (newTaskName.trim() !== '') {
      handleCreateTask(newTaskName);
      setNewTaskName(''); // Reset input field after creation
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle} className="task-modal-header">
        Create New Task
      </ModalHeader>
      <ModalBody className="task-modal-body">
        <FormGroup>
          <Label for="taskName" className="task-modal-label">
            Task Name
          </Label>
          <Input
            id="taskName"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Enter task name"
            className="task-input"
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter className="task-modal-footer">
        <Button
          color="primary"
          onClick={onCreate}
          disabled={newTaskName.trim() === ''} // Disable if input is empty
          style={{
            backgroundColor: newTaskName.trim() === '' ? '#ccc' : '#007bff',
            cursor: newTaskName.trim() === '' ? 'not-allowed' : 'pointer',
          }}
        >
          Create
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
