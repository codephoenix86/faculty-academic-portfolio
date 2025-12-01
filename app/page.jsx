// import Hero from "@/components/hero";
// import { getProfile } from "@/utils/sanity";
// import VisitorTracker from "@/components/VisitorTracker";

// export default async function Home() {
//   const profile = await getProfile();

//   return (
//     <main>
//       <VisitorTracker profileId={profile?._id} />
//       <Hero profile={profile} />
//     </main>
//   );
// }

import Hero from "@/components/hero";
import { getProfile } from "@/utils/sanity";
import VisitorTracker from "@/components/VisitorTracker";

export default async function Home() {
  const profile = await getProfile();

  return (
    <main>
      <VisitorTracker profileId={profile?._id} initialCount={profile?.visitorCount || 0} />
      <Hero profile={profile} />
    </main>
  );
}