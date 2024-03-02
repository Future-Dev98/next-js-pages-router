import { useRouter } from 'next/router';
import * as React from 'react';

export interface PostDeatilPageProps {
}

export default function PostDeatilPage (props: PostDeatilPageProps) {
    const router = useRouter();
  return (
    <div>
      <h1>Post detail page</h1>
      <p>Query: {JSON.stringify(router.query)}</p>
    </div>
  );
}

