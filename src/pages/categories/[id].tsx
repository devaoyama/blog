import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Paginator from "../../components/Paginator";
import PostListItem from "../../components/PostListItem";
import { PostType } from "../../types/PostType";

type CategoryPorps = {
  posts: PostType[]
};

const Category: React.FC<CategoryPorps> = ({ posts }) => {
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

export const getStaticPaths = async () => {
  const res = await fetch(process.env.MICRO_CMS_API_ENDPOINT + "/categories", {
    method: "GET",
    headers: {
      'X-API-KEY': process.env.MICRO_CMS_API_KEY,
    },
  });
  const data = await res.json();
  const paths = data.contents.map(content => `/categories/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async context => {
  const id = context.params.id;
  const res = await fetch(`${process.env.MICRO_CMS_API_ENDPOINT}/posts?filters=category[equals]${id}`, {
    method: "GET",
    headers: {
      'X-API-KEY': process.env.MICRO_CMS_API_KEY,
    },
  });
  const data = await res.json();
  return {
    props: {
      posts: data.contents,
    },
  };
};

export default Category;
