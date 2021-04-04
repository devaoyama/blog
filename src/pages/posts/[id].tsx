import Link from "next/link";
import React, { useCallback } from "react";
import { PostType } from "../../types/PostType";

type ShowPostProps = {
  post: PostType
};

const ShowPost: React.FC<ShowPostProps> = ({ post }) => {
  const formatDate = useCallback((strDate: string): string => {
    const date = new Date(strDate);
    return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
  }, []);

  return (
    <React.Fragment>
      <div className="min-h-3/4 mx-auto lg:w-5/6 xl:w-2/3 sm:px-3">
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
