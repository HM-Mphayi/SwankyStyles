import React from "react";
import "./Profile.scss";
import { SignedIn, UserProfile } from "@clerk/clerk-react";

export default function Profile() {
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
