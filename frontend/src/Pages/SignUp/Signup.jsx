import React, {useEffect}from "react";
import { SignUp } from "@clerk/clerk-react";
import "./Signup.scss";

function Signup() {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])

  return (
    <main className="signup d-flex flex-column align-items-center justify-content-center">
      <SignUp />
    </main>
  );
}

export default Signup;
