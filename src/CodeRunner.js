import React, { useState } from 'react';

export default function CodeRunner({ code, language }) {
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  const executeCode = () => {
    if (language !== 'javascript') {
      setOutput(`⚠️ Code execution is only for JavaScript. 
Current language: ${language}
      
To run this code:
• Switch to JavaScript language
• Or copy the code and run it in a ${language} environment`);
      return;
    }

    if (!code.trim()) {
      setOutput('No code to execute');
      return;
    }

    setIsExecuting(true);
    setOutput('');

    try {
      // Create a safe execution environment
      const outputCapture = [];
      
      // Override console methods to capture output
      const originalLog = console.log;
      const originalError = console.error;
      const originalWarn = console.warn;
      
      console.log = (...args) => {
        outputCapture.push('📝 ' + args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '));
      };
      
      console.error = (...args) => {
        outputCapture.push('❌ ' + args.map(arg => String(arg)).join(' '));
      };
      
      console.warn = (...args) => {
        outputCapture.push('⚠️ ' + args.map(arg => String(arg)).join(' '));
      };

      // Override window.alert to capture alerts
      const originalAlert = window.alert;
      window.alert = (message) => {
        outputCapture.push('🔔 Alert: ' + String(message));
      };

      // Override window.prompt to provide default responses
      const originalPrompt = window.prompt;
      window.prompt = (message, defaultValue = '') => {
        outputCapture.push('❓ Prompt: ' + String(message));
        return defaultValue || 'user_input';
      };

      // Execute the code
      const result = eval(code);
      
      // If the code returns a value, show it
      if (result !== undefined) {
        outputCapture.push('↩️ Result: ' + (typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result)));
      }

      // Restore original functions
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
      window.alert = originalAlert;
      window.prompt = originalPrompt;

      setOutput(outputCapture.length > 0 ? outputCapture.join('\n') : '✅ Code executed successfully (no output)');
      
    } catch (error) {
      setOutput(`❌ Error: ${error.message}\n\nStack trace:\n${error.stack}`);
    } finally {
      setIsExecuting(false);
    }
  };

  const clearOutput = () => {
    setOutput('');
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <div style={{ marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button
          onClick={executeCode}
          disabled={isExecuting}
          style={{
            padding: '8px 16px',
            backgroundColor: language === 'javascript' ? '#4CAF50' : '#757575',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: language === 'javascript' ? 'pointer' : 'not-allowed',
            fontSize: '14px'
          }}
        >
          {isExecuting ? '⏳ Running...' : '▶️ Run Code'}
        </button>
        <button
          onClick={clearOutput}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          🗑️ Clear Output
        </button>
        {language !== 'javascript' && (
          <span style={{ color: '#ff9800', fontSize: '12px' }}>
            ⚠️ Execution only available for JavaScript
          </span>
        )}
      </div>
      
      <div style={{ 
        backgroundColor: '#1e1e1e', 
        color: '#ffffff', 
        padding: '15px', 
        borderRadius: '4px',
        fontFamily: 'monospace',
        fontSize: '13px',
        minHeight: '100px',
        maxHeight: '300px',
        overflowY: 'auto',
        whiteSpace: 'pre-wrap',
        border: '1px solid #333'
      }}>
        {output || '💡 Click "Run Code" to execute your JavaScript blocks'}
      </div>
    </div>
  );
}