import React, { useState } from 'react';
import usePostData from '../components/shared/post_data';

const MoveView = () => {
  const [deviceData] = useState({
    dev_class: "Class 1",
    dev_comments: "Some comments",
    dev_location: "Room 101",
    dev_manufacturer: "Company 1",
    dev_model: "Model 1",
    dev_name: "Device 1",
  });
  
  const { result, loading, error, postData } = usePostData('devices');

  const handleDeviceUpload = () => {
    postData(deviceData);
  };

  return (
    <div>
      <h1>Post Device Data to API</h1>
      <button onClick={handleDeviceUpload}>Upload Device</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {result && <p>Result: {JSON.stringify(result)}</p>}
    </div>
  );
};

export default MoveView;
