import { MicroCMSListResponse } from "microcms-js-sdk";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { ComponentProps, useState } from "react";
import { client } from "src/libs/client";

export type Blog = {
  title: string;
  body: string;
};

type Props = MicroCMSListResponse<Blog>;

const Home: NextPage<Props> = (props) => {
  const [search, setSearch] = useState<Props>();

  const handleSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();
    const q = event.currentTarget.query.value;
    const data = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ q }),
    });
    const json: Props = await data.json();
    setSearch(json);
  };

  const handleClick: ComponentProps<"button">["onClick"] = () => {
    setSearch(undefined);
  };

  const contents = search ? search.contents : props.contents;
  const totalCount = search ? search.totalCount : props.totalCount;
  return (
    <div>
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input type="text" name="query" className="border border-black px-2" />
        <button className="border border-black px-2">検索</button>
        <button
          type="reset"
          className="border border-black px-2"
          onClick={handleClick}
        >
          リセット
        </button>
      </form>
      <p className="text-gray-400">{`${
        search ? "検索結果" : "記事の総数"
      }：${totalCount}件`}</p>
      <ul className="mt-4 space-y-4">
        {contents.map((content) => {
          return (
            <li key={content.id}>
              <Link href={`/blog/${content.id}`}>
                <a className="text-xl text-blue-800 underline hover:text-blue-400">
                  {content.title}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await client.getList({ endpoint: "blog" });
  return {
    props: data,
  };
};

export default Home;
