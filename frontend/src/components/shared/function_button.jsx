import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

const Function_button = ({
  text=' ',
  variant='contained',
  disabled= false,
  onClick,
  type,
  size = 'medium',
  color,
  startIcon, //if icons are needed
  endIcon,
}) => {
  

  return (
    <Button
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      type={type}
      size = {size}
      color={color}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {text}
    </Button>
  );
};

Function_button.propTypes = {
  text: PropTypes.string.isRequired, //mandatory
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["input"]),
  variant: PropTypes.oneOf(["text", "outlined", "contained"]),
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf(
    ["primary", "secondary", "error", "info", "success", "warning"]),
  startIcon: PropTypes.node,
  endIcon: PropTypes.node
};

export default Function_button;