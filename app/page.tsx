import { Suspense } from 'react';
import { CampaignProvider } from '@/lib/store';
import { Editor } from '@/components/editor/Editor';

export default function Home() {
  return (
    <CampaignProvider>
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <Editor />
      </Suspense>
    </CampaignProvider>
  );
}

