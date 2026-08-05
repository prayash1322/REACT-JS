import "./globals.css";

export const metadata = {
  title: "Next.js project",
  description: "React and Next.js project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}