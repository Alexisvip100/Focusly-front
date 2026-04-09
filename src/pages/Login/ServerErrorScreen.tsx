import React from 'react';

interface ServerErrorScreenProps {
  errorDetails: {
    statusCode?: number;
    timestamp?: string;
    path?: string;
    message?: string;
  } | null;
  onRetry: () => void;
}

export const ServerErrorScreen: React.FC<ServerErrorScreenProps> = ({ errorDetails, onRetry }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ marginBottom: '20px' }}>Server Connection Error</h1>

      {errorDetails ? (
        <div
          style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            maxWidth: '600px',
            width: '100%',
            marginBottom: '20px',
            textAlign: 'left',
          }}
        >
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {JSON.stringify(errorDetails, null, 2)}
          </pre>
        </div>
      ) : (
        <p>Could not connect to the server.</p>
      )}

      <button
        onClick={onRetry}
        style={{
          padding: '10px 20px',
          backgroundColor: '#721c24',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Retry Connection
      </button>
    </div>
  );
};
