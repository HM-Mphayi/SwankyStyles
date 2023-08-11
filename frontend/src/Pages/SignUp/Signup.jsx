import React from "react";
import { SignUp } from "@clerk/clerk-react";
import "./Signup.scss";

function Signup() {
  return (
    <main className="signup d-flex flex-column align-items-center justify-content-center">
      <SignUp />
    </main>
  );
}

export default Signup;
