import { connectToDatabase } from "../../util/mongodb";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "50vw",
    backgroundColor: theme.palette.background.paper,
  },
  article: {

  },
  tags: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(0.5),
    }
  }
}));


export default function programming({articles}) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <List dense>
          {articles.map((article, index)=> {
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
                  <Link href={article.url} target="_blank" rel="noreferrer" color="inherit">
                    <ListItemText id={article._id} primary={article.title} />
                  </Link>
                  <ListItemSecondaryAction className={classes.tags}>
                    <Chip label="Basic" color="primary" clickable />
                    <Chip label="Basic" clickable />
                    <Chip label="Basic" clickable/>
                  </ListItemSecondaryAction>
                </ListItem>
                {/* <Divider /> */}
              </div>  
            );
          })}
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
    
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const articles = await db
    .collection("articles")
    .find()
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
    },
  };
}