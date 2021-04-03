import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import PostListSection from "../../components/PostListSection";
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
          <PostListSection posts={posts} />
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
