import type { Metadata } from 'next';
import ContactTwo from '@/views/ContactTwo';

export const metadata: Metadata = {
  title: '联系我们 · Contact · Scale Up AI',
  description: '联系 Scale Up AI，企业级人工智能咨询与解决方案。Enterprise AI consulting & solutions.',
};

export default function Page() {
  return <ContactTwo />;
}
