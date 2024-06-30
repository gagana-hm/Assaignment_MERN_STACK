import React, { useEffect } from 'react';
import $ from 'jquery';
import 'dropify/dist/css/dropify.min.css';
import 'dropify/dist/js/dropify.min.js';

const DropifyInput = ({defaultFileUrl}) => {
  useEffect(() => {
    $('.dropify').dropify();
  }, []);

  return (
    <input type="file" className="dropify" data-default-file={defaultFileUrl?`http://localhost:3001/${defaultFileUrl}`:''} />
  );
};

export default DropifyInput;
