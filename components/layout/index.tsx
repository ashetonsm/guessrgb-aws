import Meta, { MetaProps } from '@/components/layout/meta';
import { useRouter } from 'next/router';
import LoadingDots from '@/components/icons/loading-dots';
import { ReactNode } from 'react';
import CustomFonts from './customFonts';
import { Menu } from './Menu';

export default function Layout({ meta, children }: { meta: MetaProps; children: ReactNode }) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-black">
        <LoadingDots color="white" />
      </div>
    );
  }

  return (
    <>
      {/* The metadata */}
      <Meta props={meta} />
      <CustomFonts />

      <Menu loggedIn={false} />

      <main>
        {children}
      </main>
    </>
  );
}
