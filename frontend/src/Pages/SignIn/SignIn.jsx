import React from "react";
import "./SignIn.scss";
import { SignIn } from "@clerk/clerk-react";

function SignInPage() {
  return (
    <main className="signin d-flex flex-column align-items-center justify-content-center">
      <div>
        <SignIn />
      </div>
    </main>
  );
}

export default SignInPage;
