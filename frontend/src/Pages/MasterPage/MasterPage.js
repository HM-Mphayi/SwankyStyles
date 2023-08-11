import { Outlet } from "react-router-dom";

import React from "react";
import { Navbar, Footer } from "../../components";

export default function MasterPage() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
