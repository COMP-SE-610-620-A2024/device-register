import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

{/* Extending MUI Button to work as a link button.*/}
const LinkButton = ({ href, text, icon, target = "_self", iconSx,
   variant = "contained", size = "medium", color = "primary" }) => {
  return (
    <Button
      component="a"
      href={href}
      target={target}
      rel="noopener noreferrer"
      startIcon={icon}
      iconSx={iconSx}
      variant={variant}
      size={size}
      color={color}
      role="button" // Ensure tests treat it as button.
    >
      {text}
    </Button>
  );
};

LinkButton.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string,
  icon: PropTypes.node,
  target: PropTypes.string,
  iconSx: PropTypes.object,
  variant: PropTypes.oneOf(["text", "outlined", "contained"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf(
    ["primary", "secondary", "error", "info", "success", "warning"]),
};

export default LinkButton;
