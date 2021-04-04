import React, { useCallback } from "react";
import Link from "next/link";
import { CategoryType } from '../types/CategoryType';

type PostItemProps = {
  id: string
  title: string
  category: CategoryType
  publishedAt: string
  updatedAt: string
  body: string
};

const PostListItem: React.FC<PostItemProps> = ({ id, title, category, publishedAt, updatedAt, body }) => {
  const formatDate = useCallback((strDate: string): string => {
    const date = new Date(strDate);
    return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
  }, []);

  return (
    <Link href={`/posts/${id}`}>
      <article className="w-full lg:w-4/6 flex flex-col shadow my-4 cursor-pointer">
        <div className="bg-white flex flex-col justify-start p-6 hover:bg-gray-100">
          <Link href={`/categories/${category.id}`}>
            <p className="text-blue-700 text-sm font-bold pb-4">{category.name}</p>
          </Link>
          <p className="text-3xl font-bold hover:text-gray-700 pb-4">{title}</p>
          <p className="text-sm pb-3">
            公開：{formatDate(publishedAt)}
            {publishedAt !== updatedAt && (
              <>
                （更新日：{formatDate(updatedAt)}）
              </>
            )}
          </p>
          <p className="pb-6">{body}</p>
          <p className="text-gray-800 hover:text-black text-right mr-5">READ</p>
        </div>
      </article>
    </Link>
  );
};

export default PostListItem;
