import React,{useEffect} from "react";
import "./SignIn.scss";
import { SignIn } from "@clerk/clerk-react";

function SignInPage() {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  
  return (
    <main className="signin d-flex flex-column align-items-center justify-content-center">
      <div>
        <SignIn />
      </div>
    </main>
  );
}

export default SignInPage;
