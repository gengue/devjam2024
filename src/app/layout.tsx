import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Navbar />
          <div>{children}</div>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
