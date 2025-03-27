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
        <body>
            <AuthProvider>{children}</AuthProvider>
        </body>
    </html>
  );
}
