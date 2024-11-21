// // // Question : create react home page for e-commerce using function App without imports and exports and inline styles



// import React, { useState, useEffect } from 'react';
// import { Button, Box, Typography, Modal, Tooltip, CircularProgress } from '@mui/material';

// const CodeWithPreview = ({ code }) => {
//   const [openModal, setOpenModal] = useState(false);
//   const [iframeContent, setIframeContent] = useState('');
//   const [loading, setLoading] = useState(true);

//   const handlePreviewToggle = () => {
//     setOpenModal(!openModal);
//     setLoading(true); // Set loading to true when modal opens
//   };

//   useEffect(() => {
//     const htmlTemplate = `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>React Preview</title>
//         <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
//         <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
//         <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
//         <style>
//           body { font-family: Arial, sans-serif; padding: 20px; }
//         </style>
//       </head>
//       <body>
//         <div id="root"></div>
//         <script type="text/babel">
//           ${code}
//           ReactDOM.createRoot(document.getElementById('root')).render(<App />);
//         </script>
//       </body>
//       </html>
//     `;
//     setIframeContent(htmlTemplate);
//   }, [code]);

//   return (
//     <Box sx={{ margin: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
//       <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
//         <Box sx={{ display: 'flex', justifyContent: 'end' }}>
//           <Tooltip title="Copy Code" arrow>
//             <Button
//               onClick={() => navigator.clipboard.writeText(code)}
//               sx={{
//                 fontSize: '18px',
//                 color: '#fff',
//                 padding: '4px',
//                 margin: '4px',
//                 borderRadius: '5px',
//                 backgroundColor:  '#4DD0E1',
//                 '&:hover': {
//                   backgroundColor: '#009688',
//                 },
//               }}
//             >
//               &#x2398;
//             </Button>
//           </Tooltip>
//         </Box>

//         <pre
//           style={{
//             margin: 0,
//             padding: '8px',
//             backgroundColor: '#333',
//             borderRadius: '5px',
//             overflow: 'auto',
//             color: '#f8f8f2',
//             fontFamily: '"Courier New", Courier, monospace',
//             fontSize: '14px',
//             lineHeight: '1.6',
//             whiteSpace: 'pre-wrap',
//             wordBreak: 'break-word',
//           }}
//         >
//           <code>{code}</code>
//         </pre>

//         <Button
//           onClick={handlePreviewToggle}
//           variant="outlined"
//           sx={{
//             border: '1px solid #4caf50',
//             color: '#4caf50',
//             '&:hover': {
//               backgroundColor: '#e8f5e9',
//             },
//             marginTop: '10px',
//             textTransform: 'none',
//           }}
//         >
//           {openModal ? 'Close Preview' : 'Preview Output'}
//         </Button>
//       </Box>

//       <Modal
//         open={openModal}
//         onClose={handlePreviewToggle}
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           overflow: 'auto',
//         }}
//       >
//         <Box
//           sx={{
//             backgroundColor: 'white',
//             padding: '20px',
//             borderRadius: '8px',
//             boxShadow: 24,
//             width: '80%',
//             maxWidth: '800px',
//             height: '70%',
//             overflow: 'hidden',
//             textAlign: 'center',
//           }}
//         >
//           <Typography variant="h6" sx={{ marginBottom: '10px' }}>
//             Preview Output
//           </Typography>

//           {loading && (
//             <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
//           )}

//           <iframe
//             title="output-preview"
//             srcDoc={iframeContent}
//             sandbox="allow-scripts allow-same-origin"
//             width="100%"
//             height="100%"
//             style={{
//               border: '1px solid #ddd',
//               borderRadius: '8px',
//               display: loading ? 'none' : 'block',
//             }}
//             onLoad={() => setLoading(false)}
//           ></iframe>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default CodeWithPreview;


import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Modal, Tooltip, CircularProgress } from '@mui/material';
import './CodeWithPreview.css';

const CodeWithPreview = ({ code }) => {
  const [openModal, setOpenModal] = useState(false);
  const [iframeContent, setIframeContent] = useState('');
  const [loading, setLoading] = useState(true);

  const handlePreviewToggle = () => {
    setOpenModal(!openModal);
    setLoading(true);
  };

  useEffect(() => {
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React Preview</title>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/babel">
          ${code}
          ReactDOM.createRoot(document.getElementById('root')).render(<App />);
        </script>
      </body>
      </html>
    `;
    setIframeContent(htmlTemplate);
  }, [code]);

  return (
    <Box className="code-box">
      <Box className="button-container">
        <Tooltip title="Copy Code" arrow>
          <Button
            className="copy-button"
            onClick={() => navigator.clipboard.writeText(code)}
          >
            &#x2398;
          </Button>
        </Tooltip>
      </Box>

      <pre>
        <code>{code}</code>
      </pre>
      <Box className="preview-button-container">
      <Button
        className="preview-button"
        onClick={handlePreviewToggle}
      >
        {openModal ? 'Close Preview' : 'Preview Output'}
      </Button>
      </Box>
      <Modal
        open={openModal}
        onClose={handlePreviewToggle}
        className="modal-container"
      >
        <Box className="modal-content">
          <Typography variant="h6" className="modal-header">
            Preview Output
          </Typography>

          {loading && <CircularProgress className="modal-loading" />}

          <iframe
            title="output-preview"
            srcDoc={iframeContent}
            sandbox="allow-scripts allow-same-origin"
            className={`modal-iframe ${!loading ? 'loaded' : ''}`}
            onLoad={() => setLoading(false)}
          ></iframe>
        </Box>
      </Modal>
    </Box>
  );
};

export default CodeWithPreview;
