import PageLayout from '../page-layout';
import TeamContent from '@/app/team/_components/team-content';

export default function TeamPage() {
  return (
    <PageLayout>
      <div className="container py-16 sm:py-24">
        <TeamContent isEnglish={false} />
      </div>
    </PageLayout>
  );
}
