// UploadModal.jsx
import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

export default function UploadModal({ isOpen, toggle, handleUploadFile }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const onUpload = () => {
    if (selectedFile) {
      handleUploadFile(selectedFile);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered style={{ borderRadius: '12px' }}>
      <ModalHeader toggle={toggle} style={{ fontWeight: '600', fontSize: '20px' }}>
        Upload a Document
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="fileInput" style={{ fontWeight: '500', marginBottom: '10px' }}>
            Select PDF File
          </Label>
          <Input
            type="file"
            id="fileInput"
            accept="application/pdf"
            onChange={handleFileChange}
            style={{
              border: '1px solid #ddd',
              padding: '8px',
              borderRadius: '6px',
            }}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={onUpload}
          disabled={!selectedFile}
          style={{
            backgroundColor: '#00c875',
            border: 'none',
            borderRadius: '6px',
          }}
        >
          Upload
        </Button>
        <Button
          color="secondary"
          onClick={toggle}
          style={{
            backgroundColor: '#ddd',
            borderRadius: '6px',
          }}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
