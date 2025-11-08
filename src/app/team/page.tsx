
'use client';
import ClientLayout from '../_components/ClientLayout';
import TeamContent from './_components/team-content';

export default function TeamPage() {
  return (
    <ClientLayout>
      <div className="container py-16 sm:py-24">
        <TeamContent isEnglish={false} />
      </div>
    </ClientLayout>
  );
}
