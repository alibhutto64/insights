import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Link from 'next/link'


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '15px 10px',
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'warp'
  },
  videoCard: {
    maxWidth: '23vw',
    marginTop: '10px',
    marginRight: '10px',
  },
  header: {
    padding: '0 16px' 
  }
}));

export default function ShowVideos(props) {
  const classes = useStyles();
  
  const deleteVideo = async (id) => {
    const response = await fetch('/api/videos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'delete',
        id: id
      })
    })
    const status = await response.text()
    console.log(status)
  }
  return(
    <Paper id="videos" elevation={3} className={classes.paper}>
        {props.videos.map(video=> (
            <Card className={classes.videoCard}>
            <CardHeader 
              className={classes.header} 
              action={
                <IconButton aria-label="delete" onClick={()=>deleteVideo(video.videoId)}> 
                <DeleteIcon style={{ color: 'gray' }} />
                </IconButton>
              }
            />
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="auto"
                image={video.image}
                title={video.title}
              />
            <Link href={`/videoplayer/${video.videoId}`}>
                <CardActionArea>
                      <CardContent>
                            <Typography gutterBottom variant="subtitle2">
                              {video.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              {video.desc}
                            </Typography>
                      </CardContent>
                </CardActionArea>
              </Link>
            </Card> 
        ))}
    </Paper >
  )
}