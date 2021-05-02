import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import TranslateIcon from '@material-ui/icons/Translate';
import EcoIcon from '@material-ui/icons/Eco';
import PersonIcon from '@material-ui/icons/Person';
import CodeIcon from '@material-ui/icons/Code';

// styling for drawer
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(9),
  },
  icon: {
    minWidth: "40px",
  },
  logo: {
    cursor: "pointer"
  }
}));

//Categories content
const goalCataegories = [
  {
    catName: "language",
    sections: [
      "Arabic",
      "Chinese",
      "English",
      "Urdu",
      "Sindhi"
    ]
  },
  {
    catName: "islamic",
    sections: [
      "Quran",
      "Lectures",
    ]
  },
  {
    catName: "personal",
    sections: [
      "Relationship",
      "Physical",
      "Skills"
    ]
  },
  {
    catName: "tech",
    sections: [
      "Programming",
      "Hardware"
    ]
  }
]

export default function MyDrawer(props) {
  // States and functions 
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [clickedItemIndex, setClickedItemIndex] = React.useState("");

  const handleClick = (i) => {
    if (open && clickedItemIndex!==i) {
      setClickedItemIndex(i);
    }
    else {
      setClickedItemIndex(i);
      setOpen(!open);
    }

  };

  const iconSwitch = (catName) => {
    switch(catName) {
      case 'language':
        return <TranslateIcon />
        break;
      
      case 'islamic':
        return <EcoIcon />
        break;
      
      case 'personal':
        return <PersonIcon />
        break;
      
      case 'tech':
        return <CodeIcon />
        break;

      default:
        return <EcoIcon />
    }
  }

  // html - rendered code
  return (
    
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Link href="/">
            <Typography variant="h6" className={classes.logo} noWrap>
              Insights
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
            {goalCataegories.map((cat, i) => (
               <list>
                 <ListItem button key={cat.catName} onClick={()=>{handleClick(i)}}>
                  <ListItemIcon className={classes.icon}>
                    {iconSwitch(cat.catName)}
                  </ListItemIcon>
                  <ListItemText primary={`${cat.catName.toUpperCase()} GOALS`} />
                </ListItem>
                <Collapse in={open && clickedItemIndex==i} timeout="auto" unmountOnExit>
                  {cat.sections.map((sec, i) => (
                    <List component="div" disablePadding>
                      <Link key={i.toString()} href={`/${cat.catName}/${sec.toLowerCase()}`}>
                        <ListItem button className={classes.nested}>
                            <ListItemText primary={sec} />
                        </ListItem>
                      </Link>
                    </List>
                  ))}
                </Collapse>
               </list> 
            ))
            }
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {props.children}
      </main>
    </div>
  );
}