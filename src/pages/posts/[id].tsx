import React, { useCallback } from "react";
import Ogp from "../../components/Ogp";
import PostShowSection from "../../components/PostShowSection";
import { PostType } from "../../types/PostType";

type ShowPostProps = {
  post: PostType
};

const ShowPost: React.FC<ShowPostProps> = ({ post }) => {
  return (
    <React.Fragment>
      <Ogp type="article" title={post.title} description={post.description} />
      <div className="min-h-3/4 mx-auto lg:w-5/6 xl:w-2/3 sm:px-3">
        <PostShowSection post={post} />
      </div>
    </React.Fragment>
  );
};

export const getStaticPaths = async () => {
  const res = await fetch(process.env.MICRO_CMS_API_ENDPOINT + "/posts", {
    method: "GET",
    headers: {
      'X-API-KEY': process.env.MICRO_CMS_API_KEY,
    },
  });
  const data = await res.json();
  const paths = data.contents.map(content => `/posts/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async context => {
  const id = context.params.id;
  const res = await fetch(`${process.env.MICRO_CMS_API_ENDPOINT}/posts/${id}`, {
    method: "GET",
    headers: {
      'X-API-KEY': process.env.MICRO_CMS_API_KEY,
    },
  });
  const data = await res.json();
  return {
    props: {
      post: data,
    },
  };
};

export default ShowPost;
