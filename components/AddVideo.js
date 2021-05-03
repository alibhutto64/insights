import TextField from '@material-ui/core/TextField';
import { useRouter } from 'next/router';

export default function AddVideo(props) {
  const [message, setMessage] = React.useState("");
  
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath +'#videos');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/videos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'add',
        cat: props.cat,
        id: e.target[0].value
      })
    })
    const status = await response.text()
    setMessage(status)
    refreshData()
  }

  return (
    <div>
      <form onSubmit={e=>{handleSubmit(e)}} style={{width: '350px', margin:"20px auto"}}>
        <TextField id="videoLink" label={`Add ${props.cat} Video`} style={{width: '100%'}} variant="outlined" />
      </form>
      <h4>{message}</h4>
    </div>
  )
}