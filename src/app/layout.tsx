import "~/styles/globals.css";
import { AuthProvider } from "./_util/authContext";

export const metadata = {
  title: "Platos",
  description: "Store all your favourite recipes in one place.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
        <head>
            <meta name="apple-mobile-web-app-capable" content="yes"/>
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
        </head>
        <body>
            <AuthProvider>{children}</AuthProvider>
        </body>
    </html>
  );
}
