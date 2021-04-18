import { connectToDatabase } from "../util/mongodb";
import AddArticle from '../components/AddArticle'
import MyCard from '../components/MyCard'

export default function Home(props) {

  return (
    <div>
      <AddArticle />
      <MyCard cards={props.articles}/>
    </div>
  )
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const articles = await db
    .collection("articles")
    .find()
    .sort({ _id: -1 })
    .limit(20)
    .toArray();
  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles))
    },
  };
}