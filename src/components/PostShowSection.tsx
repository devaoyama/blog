import React, { useCallback } from "react";
import Link from "next/link";
import { PostType } from "../types/PostType";

type PostShowSectionProps = {
  post: PostType
}

const PostShowSection: React.FC<PostShowSectionProps> = ({ post }) => {
  const formatDate = useCallback((strDate: string): string => {
    const date = new Date(strDate);
    return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
  }, []);

  return (
    <article className="flex flex-col shadow my-4">
      <div className="bg-white flex flex-col justify-start p-3 md:p-6">
        <Link href={`/categories/${post.category.id}`}>
          <p className="text-blue-700 text-sm font-bold pb-4 cursor-pointer">{post.category.name}</p>
        </Link>
        <h1 className="text-3xl font-bold hover:text-gray-700 pb-4">{post.title}</h1>
        <p className="text-sm pb-8">
          公開：{formatDate(post.publishedAt)}
          {post.publishedAt !== post.revisedAt && (
            <>
              （更新日：{formatDate(post.revisedAt)}）
            </>
          )}
        </p>
        <div
          className="post"
          dangerouslySetInnerHTML={{
            __html: `${post.body}`,
          }}
        />
      </div>
    </article>
  );
};

export default PostShowSection;
