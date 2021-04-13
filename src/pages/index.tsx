import React from "react";
import Ogp from "../components/Ogp";
import PostListSection from "../components/PostListSection";
import { PostType } from '../types/PostType';

type IndexProps = {
  posts: PostType[]
};

const Index: React.FC<IndexProps> = ({ posts }) => {
  return (
    <React.Fragment>
      <Ogp type="website" title="アイムケーのブログ" description="アイムケーのブログです。" />
      <div className="min-h-3/4 py-6">
        <PostListSection posts={posts} />
      </div>
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
