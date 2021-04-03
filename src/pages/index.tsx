import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Paginator from "../components/Paginator";
import PostListItem from "../components/PostListItem";
import { PostType } from '../types/PostType';

type IndexProps = {
  posts: PostType[]
};

const Index: React.FC<IndexProps> = ({ posts }) => {
  return (
    <React.Fragment>
      <Header />

      <main className="min-h-screen">
        <div className="container mx-auto flex flex-wrap py-6">

          <section className="w-full flex flex-col items-center px-3">

            {posts.map((post) => (
              <PostListItem key={post.id} id={post.id} title={post.title} body={post.description} category={post.category} publishedAt={post.publishedAt} updatedAt={post.revisedAt} />
            ))}

          </section>

          <Paginator prev="1" next="3" />
        </div>
      </main>

      <Footer />
      
    </React.Fragment>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(process.env.MICRO_CMS_API_ENDPOINT + "/posts", {
    method: "GET",
    headers: {
      "X-API-KEY": process.env.MICRO_CMS_API_KEY,
    },
  });
  const data = await res.json();

  return ({
    props: {
      posts: data.contents,
    },
  });
};

export default Index;
