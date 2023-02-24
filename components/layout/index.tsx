import Meta from '@/components/layout/meta';
import { useRouter } from 'next/router';
import LoadingDots from '@/components/icons/loading-dots';
import { ReactNode } from 'react';
import { Menu } from '@/components/layout/menu';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <LoadingDots color="white" />
    );
  }

  return (
    <>
      <Meta />
      <Menu />
      <main>
        {children}
      </main>
    </>
  );
}
