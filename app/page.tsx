import { CampaignProvider } from '@/lib/store';
import { Editor } from '@/components/editor/Editor';

export default function Home() {
  return (
    <CampaignProvider>
      <Editor />
    </CampaignProvider>
  );
}

