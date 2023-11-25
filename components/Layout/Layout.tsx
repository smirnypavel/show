import React from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Image from "next/image";
import comingSoon from "@/public/baners/comingSoon.jpeg";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <div>
        <Image
          src={comingSoon}
          alt={""}
          width={700}
          height={475}
          sizes="100vw"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      {/* <Header />
      <div>{children}</div>
      <Footer /> */}
    </div>
  );
};

export default Layout;
