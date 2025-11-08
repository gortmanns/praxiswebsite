'use client';
import ClientLayout from '../../_components/ClientLayout';
import ExterneDienstleisterContent from '@/app/team/_components/externe-dienstleister-content';

export default function ExterneDienstleisterEnPage() {
  return (
    <ClientLayout>
        <ExterneDienstleisterContent isEnglish={true} />
    </ClientLayout>
  );
}
