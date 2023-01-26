import { readdirSync } from "fs";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse/lib";
import remarkHtml from "remark-html";
import Layout from "@components/layout";

const Post: NextPage<{ post: string; data: any }> = ({ post, data }) => {
  return (
    <Layout title={data?.title} seoTitle={data?.title}>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: post }}
      />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  // const files = readdirSync("./posts").map((file) => {
  //   const [name, extension] = file.split(".");
  //   return { params: { slug: name } };
  // });
  // return { paths: files, fallback: false };
  return {
    paths: [],
    // fallback: "blocking",
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  // const { data, content } = matter.read(`./posts/${ctx.params?.slug}.md`);
  const { content, data } = matter.read(`./posts/${ctx.params?.slug}.md`);
  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content); //markdown에서 html로 바꿈
  return {
    props: {
      data,
      post: value,
    },
  };
};

export default Post;
