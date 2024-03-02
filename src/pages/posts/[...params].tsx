import { useRouter } from 'next/router';
import * as React from 'react';

export interface ParamsPageProps {
}

export default function ParamsPage (props: ParamsPageProps) {
    const router = useRouter();
  return (
    <div>
      Params Page: {JSON.stringify(router.query)}
    </div>
  );
}
