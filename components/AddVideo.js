import TextField from '@material-ui/core/TextField';


export default function AddVideo(props) {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/metadata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: "video",
        cat: props.cat,
        videoId: e.target[0].value
      })
    })
    console.log(response)
  }

  return (
    <form onSubmit={e=>{handleSubmit(e)}} style={{width: '350px', margin:"20px auto"}}>
      <TextField id="videoLink" label={`Add ${props.cat} Video`} style={{width: '100%'}} variant="outlined" />
    </form>
  )
}