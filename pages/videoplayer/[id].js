import { connectToDatabase } from "../../util/mongodb";
import ReactPlayer from 'react-player/youtube'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import InputAdornment from '@material-ui/core/InputAdornment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Bookmarks from '../../components/Bookmarks'

const useStyles = makeStyles((theme) => ({
    radio: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      marginRight: '10px'
    }
}))

export default function videoplayer(props) {

  const classes = useStyles();

  // getting video id from uri
  const router = useRouter()
  const { id } = router.query

  const [note, setNote] = React.useState(null);
  const [player, setPlayer] = React.useState(null);
  const [bookmarks, setbookmarks] = React.useState(props.video.bookmarks);
  const [moveBackSec, setmoveBackSec] = React.useState("10");

  const handleBookmark = async (currTime, move) => {

    let time = currTime - parseInt(move) > 0 ? currTime - parseInt(move) : 0

      const newBookmark = {
        time: time,
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

  const handleChange = (event) => {
    setmoveBackSec(event.target.value)
  }

  return (
    <Container maxWidth="lg">
      <Grid spacing={1} container>
        <Grid item lg={8}>
          <ReactPlayer width="100%" height="60vh" ref={(player) => setPlayer(player)} url={`https://www.youtube.com/watch?v=${id}`} controls playing pip stopOnUnmount={false}/>
        </Grid>
        <Grid item lg={4}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Move back</FormLabel>
            <RadioGroup row aria-label="moveback" name="moveback" value={moveBackSec} onChange={handleChange} className={classes.radio}> 
              <FormControlLabel value="10" labelPlacement="start" control={<Radio />} label="10 sec" />
              <FormControlLabel value="30" labelPlacement="start" control={<Radio />} label="30 sec" />
              <FormControlLabel value="60" labelPlacement="start" control={<Radio />} label="60 sec" />
              <FormControlLabel value="120" labelPlacement="start" control={<Radio />} label="120 sec" />
            </RadioGroup>
          </FormControl>
          <TextField onChange={(e)=>{setNote(e.target.value)}} style={{width: '100%'}} label="Bookmark" variant="outlined" InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton onClick={() => handleBookmark(player.getCurrentTime(), moveBackSec)} aria-label="bookmark">
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