import React, { useEffect, useState } from 'react';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface PostsListPageProps {
    posts: any[]
}

export default function PostsListPage ({posts}: PostsListPageProps) {
    const [postList, setPostList] = useState(posts);
    const router = useRouter();
    const page = router.query?.page;

    useEffect(() => {
        if (!page) return;
        (async () => {
            const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`);
            const data = await response.json();

            setPostList(data.data);
        })()
    }, [page]);

    function nextPage() {
        router.push({
            pathname: 'posts',
            query: {
                page: (Number(page) || 1) + 1
            }
        },
        undefined,
        {shallow: true});
    }
  return (
    <>
        <h1>Post List page</h1>
        <ul>
            {postList.map((post) => (
                <li key={post.id}>
                    <Link href={`/posts/${post.id}`}>{post.title}</Link>
                </li>
            ))}
        </ul>
        <button onClick={nextPage}>Next</button>
    </>
  );
}

export const getStaticProps: GetStaticProps<PostsListPageProps> = async(context: GetStaticPropsContext) => {
    const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
    const data = await response.json();
    return {
        props: {
            posts: data.data.map((x:any) => ({id: x.id, title: x.title}))
        }
    }
}

