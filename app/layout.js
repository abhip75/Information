
import Main from "@/components/Main";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';



export const metadata = {
  title: "Users Data",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Main/>
        {children}
      </body>
    </html>
  );
}
