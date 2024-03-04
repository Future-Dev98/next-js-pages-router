import React from 'react';
import { GetStaticProps, GetStaticPropsContext } from 'next';

export interface PostsListPageProps {
    posts: any[]
}

export default function PostsListPage ({posts}: PostsListPageProps) {
  return (
    <>
        <h1>Post List page</h1>
        <ul>
            {posts.map((post) => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    </>
  );
}

export const getStaticProps: GetStaticProps<PostsListPageProps> = async(context: GetStaticPropsContext) => {
    const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
    const data = await response.json();
    console.log(data.data)
    return {
        props: {
            posts: data.data.map((x:any) => ({id: x.id, title: x.title}))
        }
    }
}

