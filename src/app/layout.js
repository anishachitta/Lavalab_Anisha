import "./globals.css";

export const metadata = {
  title: "Your App Name",
  description: "Your app description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">{children}</body>
    </html>
  );
}
