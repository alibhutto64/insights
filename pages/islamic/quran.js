import { connectToDatabase } from "../../util/mongodb";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
    padding: '15px 10px',
    marginBottom: '30px'
  },
  root: {
    maxWidth: 1000,
    width: "100%",
    margin: "0 auto"
  },
  note: {
    textTransform: "capitalize"
  },
  edit: {
    backgroundColor: "#222222",
    color: 'white',
    '&:hover' : {
      color: '#222222'
    }  
  } 
}));

export default function quran( {quran} ) {
  const classes = useStyles();

  return(
    <List className={classes.root}>
      {quran.map((ayat, index)=> {
        return (
          <Paper elevation={3} className={classes.paper}>
            <ListItem key={index}>
              <ListItemIcon>
                <div className={classes.reference}><Typography variant="subtitle1">{ayat.surah}:{ayat.aya}</Typography></div>
              </ListItemIcon>
              <ListItemText className={classes.note} inset="true" primary={ayat.note} secondary='Say (O Muhammad SAW to mankind): "If you (really) love Allah then follow me (i.e. accept Islamic Monotheism, follow the Quran and the Sunnah), Allah will love you and forgive you of your sins. And Allah is Oft-Forgiving, Most Merciful."'/>
            </ListItem>
            <ButtonGroup>
              <Button variant="contained" classes={{ root: classes.edit}}>Edit</Button>
              <Button variant="contained" color="primary">Tafseer</Button>
            </ButtonGroup>
          </Paper>
        )
      })}
    </List>
  )
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const quran = await db
    .collection("quran")
    .find()
    .sort({surah:1, aya:1})
    .toArray();
  return {
    props: {
      quran: JSON.parse(JSON.stringify(quran))
    },
  };
}