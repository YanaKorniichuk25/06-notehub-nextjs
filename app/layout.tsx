import "./globals.css";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { TanStackProvider } from "../components/TanStackProvider/TanStackProvider";

export const metadata = {
  title: "NoteHub",
  description: "Simple note management app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
