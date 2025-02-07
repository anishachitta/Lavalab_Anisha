import "./globals.css";

export const metadata = {
  title: "Lavalab Inventory App",
  description: "Lavalab Assessment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">{children}</body>
    </html>
  );
}
