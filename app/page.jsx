import Profile from "@/components/profile";
import { getProfile } from "@/utils/sanity";
import VisitorTracker from "@/components/VisitorTracker";

export default async function Home() {
  const profile = await getProfile();

  return (
    <main>
      <VisitorTracker profileId={profile?._id} initialCount={profile?.visitorCount || 0} />
      <Profile profile={profile} />
    </main>
  );
}