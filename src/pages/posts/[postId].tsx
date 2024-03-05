import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface PostDetailPageProps {
  post: any
}

export default function PostDetailPage ({post}: PostDetailPageProps) {
  console.log(post)
  return (
    <div>
      <h1>{post.title}</h1>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
  const data = await response.json();
  return {
    paths: data.data.map((post: any) => ({params: {postId: post.id}})),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<PostDetailPageProps> = async(context: GetStaticPropsContext) => {
  const postId = context.params?.postId

  if (!postId) return { notFound: true }

  const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`);
  const data = await response.json();
  return {
      props: {
          post: data
      }
  }
}
