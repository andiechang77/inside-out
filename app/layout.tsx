import "@styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "inside out",
  description: "inside out",
};

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default layout;
