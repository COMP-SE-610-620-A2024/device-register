import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Button } from '@mui/material';
import Function_button from '../shared/function_button';
import { config } from '../../utils/config';


const Attachment_box = ({ id }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  // custom post for formdata
  const postFormData = async (endpoint, formData) => {

    const url = `${config.BACKEND_ADDR}/${endpoint}`;

    const access_token = localStorage.getItem("access_token"); // eslint-disable-line no-undef
    const headers = {
        'Content-Type': 'application/json',
        ...(access_token && { 'Authorization': `Bearer ${access_token}` }),
      };
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: headers
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      setUploadResult(result);
    } catch (err) {
      setUploadError(err);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      postFormData(`attachments/upload/${id}`, formData);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 800,
        width: '80%',
        margin: 'auto',
        padding: 2,
        mt: 8,
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" component="div">
          Upload Attachment
        </Typography>
        <input type="file" onChange={handleFileChange} />
        <Function_button
          text='Upload'  
          variant="contained"
          color="primary"
          onClick={handleFileUpload}
          disabled={!selectedFile}
          sx={{ mt: 2 }}
        >
        </Function_button>
        {uploadResult && (
          <Typography color="success.main" variant="body2" sx={{ mt: 2 }}>
            File uploaded successfully!
          </Typography>
        )}
        {uploadError && (
          <Typography color="error.main" variant="body2" sx={{ mt: 2 }}>
            Failed to upload file. Please try again.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

Attachment_box.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Attachment_box;