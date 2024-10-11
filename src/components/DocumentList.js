import React from 'react';

export default function DocumentList({ documents = [], setSelectedDocument }) {
  const handleOpenPDF = (file) => {
    // Assuming file is a URL or blob, open it in a new tab with a PDF viewer
    window.open(`/pdf-viewer?file=${encodeURIComponent(file)}`, '_blank');
  };

  return (
    <div>
      {documents.length === 0 ? (
        <p style={{ fontStyle: 'italic', color: '#aaa' }}>No documents uploaded yet.</p>
      ) : (
        documents.map((doc, index) => (
          <div
            key={index}
            style={{
              padding: '10px',
              marginBottom: '5px',
              borderRadius: '6px',
              background: '#f5f5f5',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ fontWeight: '500' }}>
              📄 {doc.name}
            </div>
            <button
              onClick={() => handleOpenPDF(doc.file)} // Trigger the PDF viewer
              style={{
                backgroundColor: '#00c875',
                border: 'none',
                borderRadius: '6px',
                color: '#fff',
                padding: '5px 10px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Go to the file
            </button>
          </div>
        ))
      )}
    </div>
  );
}
