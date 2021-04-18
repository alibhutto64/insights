import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '15px 10px',
    marginBottom: '30px',
  },
  myCard: {
    maxWidth: 275,
    maxHeight: 300,
    overflow: 'hidden',
    marginTop: '10px'
  },
}));

export default function MyCard(props) {
  const classes = useStyles();

  return(
    <Paper elevation={3} className={classes.paper}>
    <Grid container justify="center" spacing={2}>
        {props.cards.map((card, i)=> (
            <Grid key={i} item>
            <Card className={classes.myCard}>
                <a href={card.url} target="_blank" style={{textDecoration: "none", color: "black"}}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={card.image}
                    title={card.title}
                    />
                    <CardContent>
                    <Typography style={{lineHeight: 1.2, fontSize:'1rem'}} variant="h6" component="h2">
                        {card.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" paragraph>
                        {card.desc}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                </a>
            </Card>
          </Grid>
        ))}
    </Grid>
    </Paper >
  )
}