import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 text-center text-xs md:text-sm py-1 md:py-2 bg-transparent leading-none">
      <p className="m-0 p-0 leading-none">
        &copy; {new Date().getFullYear()} EddyOut. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
