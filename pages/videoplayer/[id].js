import { connectToDatabase } from "../../util/mongodb";
import ReactPlayer from 'react-player/youtube'
import { useRouter } from 'next/router'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import InputAdornment from '@material-ui/core/InputAdornment';

import Bookmarks from '../../components/Bookmarks'

export default function videoplayer(props) {
  // getting video id from uri
  const router = useRouter()
  const { id } = router.query

  const [note, setNote] = React.useState(null);
  const [player, setPlayer] = React.useState(null);
  const [bookmarks, setbookmarks] = React.useState(props.video.bookmarks);

  const handleBookmark = async () => {
    const newBookmark = {
      time: player.getCurrentTime(),
      note: note,
    }

    const response = await fetch('/api/bookmark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...newBookmark,
        videoId: id,
        action: 'add'
      })
    })
    const data = await response.json();
    console.log([...bookmarks, newBookmark])
    setbookmarks([...bookmarks, newBookmark])

  }

  const playFromHere = (time) => {
    player.seekTo(time)
  }

  return (
    <Container maxWidth="lg">
      <Grid spacing={1} container>
        <Grid item lg={8}>
          <ReactPlayer width="100%" height="60vh" ref={(player) => setPlayer(player)} url={`https://www.youtube.com/watch?v=${id}`} controls playing pip stopOnUnmount={false}/>
        </Grid>
        <Grid item lg={4}>
            <TextField onChange={(e)=>{setNote(e.target.value)}} style={{width: '100%'}} label="Bookmark" variant="outlined" InputProps={{
              endAdornment: <InputAdornment position="end">
                <IconButton onClick={handleBookmark} aria-label="bookmark">
                  <BookmarkIcon/>
                </IconButton>
              </InputAdornment>
            }} />
          <Bookmarks playFromHere={playFromHere} id={id} bookmarks={bookmarks} />
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