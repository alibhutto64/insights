import ShowArticles from '../../components/ShowArticles';
import ShowVideos from '../../components/ShowVideos';
import { connectToDatabase } from "../../util/mongodb";

export default function programming({articles, videos}) {
  return (
    <div>
      <ShowArticles articles={articles} />
      <ShowVideos videos={videos} />
    </div>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const articles = await db
    .collection("articles")
    .find()
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();
  const videos = await db.collection('videos').find({cat:"programming"}).toArray();
  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
      videos: JSON.parse(JSON.stringify(videos))
    },
  };
}