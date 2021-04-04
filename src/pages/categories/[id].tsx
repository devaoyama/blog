import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import PostListSection from "../../components/PostListSection";
import { PostType } from "../../types/PostType";
import { CategoryType } from '../../types/CategoryType';

type CategoryPorps = {
  posts: PostType[]
  category: CategoryType
};

const Category: React.FC<CategoryPorps> = ({ posts, category }) => {
  return (
    <React.Fragment>
      <Header />

      <main className="min-h-3/4 px-3">
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
  const options = {
    method: "GET",
    headers: {
      'X-API-KEY': process.env.MICRO_CMS_API_KEY,
    },
  };
  let res = await fetch(`${process.env.MICRO_CMS_API_ENDPOINT}/posts?filters=category[equals]${id}`, options);
  const posts = await res.json();
  res = await fetch(`${process.env.MICRO_CMS_API_ENDPOINT}/categories/${id}`, options);
  const category = await res.json();
  return {
    props: {
      posts: posts.contents,
      category,
    },
  };
};

export default Category;
