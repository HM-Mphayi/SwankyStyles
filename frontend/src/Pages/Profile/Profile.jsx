import React,{useEffect} from "react";
import "./Profile.scss";
import { SignedIn, UserProfile } from "@clerk/clerk-react";

export default function Profile() {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])

  return (
    <main className="Profile d-flex  justify-content-center">
      <SignedIn>
        <div>
          <UserProfile />
        </div>
      </SignedIn>
    </main>
  );
}
