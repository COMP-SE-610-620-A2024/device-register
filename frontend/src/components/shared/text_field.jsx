import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

const Text_field = ({
  label,
  value,
  onChange,
  required = false  //If we need to indicate that field is required
}) => {


    return (
      <TextField
        label={label}
        value={value}
        onChange={onChange}
        variant="outlined"
        required = {required} 
      
      />
          
    );
  };
  Text_field.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
  };

  
  export default Text_field;