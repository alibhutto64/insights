import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';;
import Link from 'next/link'


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '15px 10px',
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'center',
  },
  videoCard: {
    maxWidth: '23vw',
    marginTop: '10px',
    marginRight: '10px'
  },
}));

export default function ShowVideos(props) {
  const classes = useStyles();

  return(
    <Paper elevation={3} className={classes.paper}>
        {props.videos.map(video=> (
          <Link href={`/videoplayer/${video.videoId}`}>
            <Card className={classes.videoCard}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="auto"
                  image={video.image}
                  title={video.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="subtitle2">
                    {video.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {video.desc}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        ))}
    </Paper >
  )
}