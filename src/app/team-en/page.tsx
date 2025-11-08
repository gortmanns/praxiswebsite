
'use client';

import ClientLayout from '../_components/ClientLayout';
import TeamContent from '@/app/team/_components/team-content';

export default function TeamEnPage() {
  return (
    <ClientLayout>
      <div className="container py-16 sm:py-24">
        <TeamContent isEnglish={true} />
      </div>
    </ClientLayout>
  );
}
