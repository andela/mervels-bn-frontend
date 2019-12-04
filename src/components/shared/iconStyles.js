import { makeStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
    fontSize: 35,
    iconHover: {
      '&:hover': {
        color: blueGrey[100],
        cursor: 'pointer',
      transition: `ease-in-out ${1}`
      },
    },
  }));

  export default useStyles;