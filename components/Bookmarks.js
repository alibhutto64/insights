import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

export default function Bookmarks(props) {

    const deleteBookmark = async (time) => {
        const response = await fetch('/api/bookmark', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                videoId: props.id,
                time: time,
                action: 'delete'
            })
        })
        const data = await response.text();
        console.log(data)
    }

   return (
       <List>
           {props.bookmarks.map((bookmark, i) => {
               if (bookmark) {
                   const min = Math.floor(bookmark.time / 60)
                   const sec = Math.floor(bookmark.time - min * 60)
                   return (
                       <ListItem key={i} onClick={() => props.playFromHere(bookmark.time)} button>
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
   ) 
}