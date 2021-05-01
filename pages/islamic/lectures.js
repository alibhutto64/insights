import AddVideo from '../../components/AddVideo'
import ShowVideos from '../../components/ShowVideos';
import { connectToDatabase } from "../../util/mongodb";

export default function lectures({videos}) {
  return(
    <div>
      <AddVideo cat="islamic"/>
      <ShowVideos videos={videos} />
    </div>
  )
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const videos = await db.collection('videos').find({ cat: "islamic" }).toArray();
  return {
    props: {
      videos: JSON.parse(JSON.stringify(videos))
    },
  };
}