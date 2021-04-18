import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '20ch',
    }
  }
}));


export default function AddArticle(props) {
  const classes = useStyles();

  const [cat, setCat] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [message, setMessage] = React.useState('');
  const handleChange = (event) => {
    setCat(event.target.value);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/metadata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: "article",
        cat: cat,
        articleLink: url
      })
    })
    const data = await response.json()
    if (data == 1) {
      setUrl("")
      setMessage("Added successfully!")
    }
  }

  return (
    <div>
      <form className={classes.root} onSubmit={e=>{handleSubmit(e)}}>
        <TextField id="articleLink" value={url} onChange={(e)=>{setUrl(e.target.value)}} label="Add New Article" style={{width: '60%'}} variant="outlined" required />
        <FormControl required>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cat}
            onChange={handleChange}
          >
            <MenuItem value={'programming'}>Programming</MenuItem>
            <MenuItem value={'islamic'}>islamic</MenuItem>
            <MenuItem value={'other'}>other</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" size="small" variant="contained" color="primary">
          submit
        </Button>
      </form>
      <h3>{message}</h3>
    </div>
  )
}
