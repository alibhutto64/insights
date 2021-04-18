import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import MLink from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '15px 10px',
    marginBottom: '30px'
  },
  tags: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(0.5),
    }
  }
}));

export default function ShowArticles(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);


  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return(
    <Paper elevation={3} className={classes.paper}>
        
        <List dense>
          {props.articles.map((article, index)=> {
            return (
              <div>
                <ListItem className={classes.article} key={article.title} button divider>
                  <ListItemIcon>
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(index)}
                      checked={checked.indexOf(index) !== -1}
                      inputProps={{ 'aria-labelledby': article._id }}
                    />
                  </ListItemIcon>
                  <MLink href={article.url} target="_blank" rel="noreferrer" color="inherit">
                    <ListItemText id={article._id} primary={article.title} />
                  </MLink>
                  {/* <ListItemSecondaryAction className={classes.tags}>
                    <Chip label="Basic" color="primary" clickable />
                    <Chip label="Basic" clickable />
                    <Chip label="Basic" clickable/>
                  </ListItemSecondaryAction> */}
                </ListItem>
              </div>  
            );
          })}
        </List>
      </Paper>
  )
}