import "./globals.css";

export const metadata = {
  title: {
    template: "%s / Pet Breed",
    default: "Pet Breed Explorer",
  },
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
