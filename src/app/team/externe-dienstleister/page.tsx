'use client';
import ClientLayout from '../../_components/ClientLayout';
import ExterneDienstleisterContent from '@/app/team/_components/externe-dienstleister-content';

export default function ExterneDienstleisterPage() {
  return (
    <ClientLayout>
        <ExterneDienstleisterContent isEnglish={false} />
    </ClientLayout>
  );
}
