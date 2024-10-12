import React, { useState } from 'react';

export default function DocumentSummary({ isSummaryCollapsed, toggleSummary, selectedDocument }) {
  const [expandedPointIndex, setExpandedPointIndex] = useState(null);

  const summaryHeight = isSummaryCollapsed ? '0px' : '150px'; // Adjust summary area height
  const summaryPoints = selectedDocument
    ? [
        { title: 'Summary 1', details: 'I am a cat\n\ncatcatcat' },
        { title: 'Summary 2', details: 'This is a dog\n\nwoof woof woof' },
        { title: 'Summary 3', details: 'I am a bird\n\nchirp chirp chirp' },
        { title: 'Summary 4', details: 'This is a fish\n\nblub blub blub' },
      ]
    : [];

  const togglePoint = (index) => {
    setExpandedPointIndex(expandedPointIndex === index ? null : index);
  };

  return (
    <div
      style={{
        height: summaryHeight,
        padding: '10px',
        backgroundColor: '#f0f4f8', // Light blue background for the summary area
        borderRadius: '5px',
        border: '1px solid #ddd',
        overflow: 'hidden',
        transition: 'height 0.3s ease',
        position: 'relative', // For the toggle button to stick to the bottom
      }}
    >
      {!isSummaryCollapsed && selectedDocument && (
        <div
          style={{
            padding: '10px',
            backgroundColor: '#f0f0f0',
            borderRadius: '5px',
            border: '1px solid #ddd',
            overflowY: 'auto', // Make this area scrollable
            maxHeight: '100px', // Limit the height of the summary
          }}
        >
          <h6 style={{ marginBottom: '5px', color: 'lightblue' }}>Document Summary</h6>
          <ul style={{ paddingLeft: '20px', fontSize: '14px', color: '#666' }}>
            {summaryPoints.map((point, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                <button
                  onClick={() => togglePoint(index)}
                  style={{
                    backgroundColor: '#64b5f6',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10%',
                    padding: '2px 10px',
                    fontSize: '10px',
                    cursor: 'pointer',
                    marginRight: '10px',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  {expandedPointIndex === index ? 'Hide' : 'Expand'}
                </button>
                <strong style={{ color: '#000000' }}>{point.title}</strong>
                {expandedPointIndex === index && (
                <p style={{ marginTop: '5px', fontSize: '12px', whiteSpace: 'pre-line', color: '#000000' }}>
                    {point.details}
                </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Toggle button for the summary */}
      <button
        onClick={toggleSummary}
        style={{
          position: 'absolute',
          bottom: '0px', // Adjust the distance from the bottom
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '2px 10px',
          backgroundColor: '#64b5f6',
          color: '#fff',
          border: 'none',
          borderRadius: '10%',
          fontSize: '8px',
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
        }}
      >
        {isSummaryCollapsed ? '>' : '<'}
      </button>
    </div>
  );
}
