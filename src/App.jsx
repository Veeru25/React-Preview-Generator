// jsx seperated


import { useState } from 'react';
import Markdown from 'markdown-to-jsx';
import ClipLoader from 'react-spinners/ClipLoader';
import CodeWithPreview from './CodeWithPreview';
import { Button, TextField, Box, Typography } from '@mui/material';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // const onSend = async () => {
  //   const userObj = {
  //     role: 'user',
  //     parts: [{ text: input }],
  //   };

  //   setHistory((prevState) => [...prevState, userObj]);
  //   setInput('');
  //   setLoading(true);

  //   try {
  //     const response = await fetch('http://localhost:3031/chat', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ message: input, history: [...history, userObj] }),
  //     });

  //     const data = await response.json();
  //     const resObj = {
  //       role: 'model',
  //       parts: [{ text: data.message }],
  //     };

  //     setHistory((prevState) => [...prevState, resObj]);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  //   setLoading(false);
  // };

  const onSend = async () => {
    const appendedInput = `${input} in react using function App,inline styles without imports and exports `;
    const userObj = {
      role: 'user',
      parts: [{ text: appendedInput }],
    };
  
    setHistory((prevState) => [...prevState, userObj]);
    setInput('');
    setLoading(true);
  
    try {
      const response = await fetch('http://localhost:3031/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: appendedInput, history: [...history, userObj] }),
      });
  
      const data = await response.json();
      const resObj = {
        role: 'model',
        parts: [{ text: data.message }],
      };
  
      setHistory((prevState) => [...prevState, resObj]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };
  
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const onNewChat = () => {
    setHistory([]);
    setInput('');
    setLoading(false)
  };

  return (
    <Box className="container">
      <h1 className='react-heading'>React code and Preview Generator</h1>
      <Box className="header">
      {/* <Button variant="contained" disabled>Disabled</Button> */}
        <Button
          className="new-chat-btn"
          variant="contained"
          size="large"
          onClick={onNewChat}
          aria-label="Start a new chat"
          sx={{ backgroundColor: '#000'}}
        >
          New Chat
        </Button>

        <TextField
          className="input-field"
          variant="outlined"
          label="Ask Here..."
          value={input}
          onChange={handleInput}
        />

        <Button className="send-btn" variant="contained" color="primary" size="large" onClick={onSend} sx={{backgroundColor :'#007bff'}}>
          {loading ? <ClipLoader color="#fff" size={20} /> : 'Send'}
          
        </Button>

      </Box>

      {/* Apply conditional padding if there is chat history */}
      <Box className={`chat-history ${history.length > 0 ? 'with-padding' : ''}`}>
        {history.map((el, index) => (
          <Box key={index} className="message-container">
            <Typography
              className={`chat-message ${el.role === 'user' ? 'user-message' : 'gpt-message'}`}
            >
              {el.parts.map((part, i) => {
                const text = part.text;
                const segments = text.split(/(```[\s\S]*?```)/g);

                return segments.map((segment, j) => {
                  if (segment.startsWith('```') && segment.endsWith('```')) {
                    const codeWithMetadata = segment.slice(3, -3); // Remove code type part
                    const [type, ...codeLines] = codeWithMetadata.split('\n');
                    const code = codeLines.join('\n'); // Join the remaining code
                    return (
                      <div key={`${i}-${j}`}>
                        <Typography variant="caption" color="#000">
                          TYPE : {type}
                        </Typography>
                        <CodeWithPreview key={`${i}-${j}`} code={code} />
                      </div>
                    );
                  } else {
                    return (
                      <Markdown className="explain-container" key={`${i}-${j}`}>
                        {segment}
                      </Markdown>
                    );
                  }
                });
              })}
            </Typography>
          </Box>
        ))}
        {loading && (
          <div>
            <ClipLoader color='#4A90E2' size={15} />
            <span className='span-loading'>...Loading</span>
          </div>
        )}
      </Box>
    </Box>
  );
}

export default App;

