import React from 'react';
import dynamic from 'next/dynamic';
export interface AboutPageProps {
}

const Header = dynamic(() => import('@/component/header'), { ssr: false })
export default function AboutPage (props: AboutPageProps) {
  return (
    <div>
      <Header/>
      About Page
    </div>
  );
}

