import PageLayout from '../page-layout';
import TeamContent from '@/app/team/_components/team-content';

export default function TeamEnPage() {
  return (
    <PageLayout>
      <div className="container py-16 sm:py-24">
        <TeamContent isEnglish={true} />
      </div>
    </PageLayout>
  );
}
