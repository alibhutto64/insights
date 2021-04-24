import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        marginBottom: '50px',
        maxWidth: '1280px'
    },
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '80px'
        },
        textAlign: 'center',
        
    },
    note: {
        width: '50%'
    },
    button: {
        marginTop: '15px'
    }
}));


export default function AddAyah() {
    const classes = useStyles();

    const [aya, setAya] = React.useState(0);
    const [surah, setSurah] = React.useState(0);
    const [note, setNote] = React.useState("");
    const handleChange = (event) => {
        setSurah(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/addayah', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                aya: aya,
                surah: surah,
                note: note
            })
        })
        const data = await response.json()
        if (data) {
            setAya("")
            setNote("Success!")
        }
    }

    const CreateMenuItem = (surahs) => {
        let menu = []
        for(let i = 1; i <= surahs; i++) {
            menu.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
        }
        return menu
    }

    return (
        <div className={classes.root}>
            <form className={classes.form} onSubmit={e => { handleSubmit(e) }}>
                <FormControl required>
                    <InputLabel id="surah-label">Surah</InputLabel>
                    <Select
                        labelId="surah-label"
                        id="surahs"
                        value={surah}
                        onChange={handleChange}
                    >
                        {CreateMenuItem(114)}
                    </Select>
                </FormControl>
                <TextField className={classes.aya} value={aya} onChange={(e) => { setAya(e.target.value) }} label="Ayah" variant="outlined" required />
                <TextField className={classes.note} value={note} onChange={(e) => { setNote(e.target.value) }} label="Write your note" variant="outlined" required />
                <Button className={classes.button} type="submit" variant="contained" color="primary">submit</Button>
            </form>
        </div>
    )
}
