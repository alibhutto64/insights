import { connectToDatabase } from "../../util/mongodb";
import ReactPlayer from 'react-player/youtube'
import { useRouter } from 'next/router'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import InputAdornment from '@material-ui/core/InputAdornment';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';


export default function videoplayer({video}) {
  // getting video id from uri
  const router = useRouter()
  const { id } = router.query

  const [note, setNote] = React.useState(null);
  const [player, setPlayer] = React.useState(null);

  const handleBookmark = async () => {
    const response = await fetch('/api/bookmark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        currentTime: player.getCurrentTime(),
        note: note,
        videoId: id,
        action: 'add'
      }) 
    })
    const data = await response.body;
    console.log(data)

  }

  const playFromHere = (time)=> {
    player.seekTo(time)
  }

  const deleteBookmark = async (time) => {
    const response = await fetch('/api/bookmark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        videoId: id,
        time: time,
        action: 'delete'
      })
    })
    const data = await response.text();
    console.log(data)
  }

  return (
    <Container maxWidth="lg">
      <Grid spacing="1" container>
        <Grid item lg="8">
          <ReactPlayer width="100%" height="60vh" ref={(player) => setPlayer(player)} url={`https://www.youtube.com/watch?v=${id}`} controls playing pip stopOnUnmount={false}/>
        </Grid>
        <Grid item lg='4'>
            <TextField onChange={(e)=>{setNote(e.target.value)}} style={{width: '100%'}} label="Bookmark" variant="outlined" InputProps={{
              endAdornment: <InputAdornment position="end">
                <IconButton onClick={handleBookmark} aria-label="bookmark">
                  <BookmarkIcon/>
                </IconButton>
              </InputAdornment>
            }} />
          <List>
            {video.bookmarks.map((bookmark, i)=> {
              if (bookmark){
                const min = Math.floor(bookmark.time / 60)
                const sec = Math.floor(bookmark.time - min * 60)
                return (
                  <ListItem key={i} onClick={() => playFromHere(bookmark.time)} button>
                    <ListItemText primary={`${min}:${sec} - ${bookmark.note}`} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" onClick={() => deleteBookmark(bookmark.time)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              }
              else {
                return (
                  <div>no bookmark!</div>
                )
              }
              
            })}
            <Divider />
          </List>
        </Grid>
      </Grid>
      
    </Container>
  )
}


export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();
  const video = await db
    .collection("videos")
    .findOne({videoId: context.params.id})
    return {
      props: {
        video: JSON.parse(JSON.stringify(video)),
      },
    };
}