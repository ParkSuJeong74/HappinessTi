import {withStyles} from "@material-ui/core/styles";
import {TextField} from '@mui/material';

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'pink',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'pink',
      }, 
      width: '300px'
    },
})(TextField);

export default CssTextField