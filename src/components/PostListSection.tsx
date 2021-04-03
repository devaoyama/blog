import React from "react";
import { PostType } from "../types/PostType";
import PostListItem from "./PostListItem";

type PostListSectionProps = {
  posts: PostType[]
};

const PostListSection: React.FC<PostListSectionProps> = ({ posts }) => {
  return (
    <section className="w-full flex flex-col items-center px-3">

      {posts.map((post) => (
        <PostListItem key={post.id} id={post.id} title={post.title} body={post.description} category={post.category} publishedAt={post.publishedAt} updatedAt={post.revisedAt} />
      ))}

    </section>
  );
};

export default PostListSection;
