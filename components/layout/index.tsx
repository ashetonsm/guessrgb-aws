import Meta from '@/components/layout/meta';
import { ReactNode } from 'react';
import { Menu } from '@/components/layout/menu';

export default function Layout({ children }: { children: ReactNode }) {

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
