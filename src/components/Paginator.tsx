import Link from "next/link";
import React from "react";

type PaginatorProps = {
  prev?: string
  next?: string
};

const Paginator: React.FC<PaginatorProps> = ({ prev, next }) => {
  return (
    <div className="w-full flex justify-between md:justify-around text-xl mx-4 py-8">
      {prev && (
        <Link href={`/page/${prev}`}> ＜ Prev</Link>
      )}
      {next && (
        <Link href={`/page/${next}`}>Next ＞ </Link>
      )}
    </div>
  );
};

export default Paginator;
