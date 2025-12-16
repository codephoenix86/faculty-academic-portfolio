import "./globals.css";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import { getProfile } from "@/utils/sanity";

export const metadata = {
  title: "Portfolio",
  description: "Academic portfolio website",
};

export default async function RootLayout({ children }) {
  const profile = await getProfile();
  
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-blue-50 via-slate-50 to-gray-50">
        <div className="flex flex-col min-h-screen">
          {/* Navigation */}
          <NavBar />

          {/* Main Content */}
          <main className="grow">{children}</main>

          {/* Global Footer */}
          <Footer profile={profile} />
        </div>
      </body>
    </html>
  );
}