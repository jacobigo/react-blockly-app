import React, { useState } from 'react';
import BlocklyEditor from './BlocklyEditor';
import CodeRunner from './CodeRunner';

export default function App() {
  const [generatedCode, setGeneratedCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Visual Programming with Blockly</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <h2 style={{ color: '#555', marginBottom: '10px' }}>Visual Blocks</h2>
          <div
            style={{
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              overflow: 'hidden',
              minHeight: '400px',
              maxHeight: '400px',
              backgroundColor: '#fff'
            }}
          >
            <BlocklyEditor 
              onCodeChange={setGeneratedCode} 
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              style={{ minHeight: '400px', maxHeight: '400px' }}
            />
          </div>
        </div>

        <div>
          <h2 style={{ color: '#555', marginBottom: '10px' }}>
            Generated Code
          </h2>
          <pre style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '8px',
            border: '1px solid #e9ecef',
            fontSize: '13px',
            fontFamily: 'Monaco, Consolas, "Courier New", monospace',
            minHeight: '400px',
            maxHeight: '400px',
            overflowY: 'auto',
            whiteSpace: 'pre-wrap'
          }}>
            {generatedCode || '// Create blocks to generate code...'}
          </pre>
          
          <CodeRunner code={generatedCode} language={selectedLanguage} />
        </div>
      </div>
      
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '8px', border: '1px solid #b3d9ff' }}>
        <h3 style={{ color: '#2c5282', marginTop: '0' }}>How to use:</h3>
        <ol style={{ color: '#2c5282', lineHeight: '1.6' }}>
          <li>Drag blocks from the categories on the left to build your program</li>
          <li>Watch the code generate automatically in your selected language</li>
          <li>Use JavaScript mode to run your code and see the results</li>
          <li>Try different languages to see how the same logic translates</li>
        </ol>
      </div>
    </div>
  );
}