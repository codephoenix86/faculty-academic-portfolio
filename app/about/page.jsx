import { getProfile } from "@/utils/sanity";
import AboutPageClient from "./AboutPageClient";

export default async function AboutPage() {
  const profileData = await getProfile();
  
  return <AboutPageClient profileData={profileData} />;
}