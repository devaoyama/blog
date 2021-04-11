import React from "react";
import PostListSection from "../../components/PostListSection";
import { PostType } from "../../types/PostType";
import { CategoryType } from '../../types/CategoryType';
import Ogp from "../../components/Ogp";

type CategoryPorps = {
  posts: PostType[]
  category: CategoryType
};

const Category: React.FC<CategoryPorps> = ({ posts, category }) => {
  return (
    <React.Fragment>
      <Ogp type="blog" title={`カテゴリー：${category.name}`} description="アイムケーのブログです。" />
      <div className="min-h-3/4 py-6">
        <h2 className="lg:w-2/3 mx-auto pl-3 text-xl">カテゴリー：{category.name}</h2>
        <PostListSection posts={posts} />
      </div>
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
