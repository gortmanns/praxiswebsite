import { TeamMemberCard } from './_components/team-member-card';
import { DoctorCard } from './_components/doctor-card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import React from 'react';
import Link from 'next/link';
import PageLayout from '../page-layout';
import TeamContent from './_components/team-content';

export default function TeamPage() {
  return (
    <PageLayout>
      <div className="container py-16 sm:py-24">
        <TeamContent isEnglish={false} />
      </div>
    </PageLayout>
  );
}
