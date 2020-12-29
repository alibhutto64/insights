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
        videoId: id
      }) 
    })
    const data = await response.body;
    console.log(data)

  }

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item lg="8">
          <ReactPlayer ref={(player)=>setPlayer(player)} url={`https://www.youtube.com/watch?v=${id}`} controls='true'/>
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
            {video.bookmarks.map(bookmark=> (
              <ListItem button>
                <ListItemText primary={`${bookmark.time} => ${bookmark.note}`} />
              </ListItem>
            ))}
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