import Link from "next/link";
import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { CategoryType } from '../../types/CategoryType';

type IndexProps = {
  categories: CategoryType[]
}

const Index: React.FC<IndexProps> = ({ categories }) => {
  return (
    <div className="min-h-3/4 mx-auto sm:w-1/2 pl-5">
      <h2 className="text-3xl font-bold my-5">カテゴリー</h2>

      <ul className="list-disc ml-8">
        {categories.map(category => (
          <li key={category.id} className="text-lg my-2">
            <Link href={`/categories/${category.id}`}>
              <span className="text-blue-600 cursor-pointer">
                {category.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(process.env.MICRO_CMS_API_ENDPOINT + "/categories", {
    method: "GET",
    headers: {
      "X-API-KEY": process.env.MICRO_CMS_API_KEY,
    },
  });
  const data = await res.json();

  return ({
    props: {
      categories: data.contents,
    },
  });
};

export default Index;
