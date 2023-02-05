import Meta, { MetaProps } from '@/components/layout/meta';
import { useRouter } from 'next/router';
import LoadingDots from '@/components/icons/loading-dots';
import { ReactNode } from 'react';

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
    <div className="w-full mx-auto h-screen flex overflow-hidden bg-black">
      {/* The metadata */}
      <Meta props={meta} />

      <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
        <div className="flex-1 relative z-0 flex overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
