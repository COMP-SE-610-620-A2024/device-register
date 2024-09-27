import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';

const LinkButton = ({ href, text, icon, target = "_self", iconSx }) => {
  return (
    <a href={href} target={target} rel="noopener noreferrer">
      {/*Render text if exists, otherwise icon*/}  
      {text ? ( 
        <span className="link_button">{text}</span>
      ) : (
        <IconButton sx={iconSx}>{icon}</IconButton>
      )}
    </a>
  );
};

LinkButton.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string,
  icon: PropTypes.node,     
  target: PropTypes.string,    
  iconSx: PropTypes.object, 
};

export default LinkButton;