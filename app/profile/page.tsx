'use client'
import React, { Suspense, useState } from "react";
import Header from "../components/Layout/Header";
import UserAuthProtected from "../hooks/userAuthProtected";
import Profile from "../components/Profile/Profile";
import HeaderSkeleton from "../components/Layout/HeaderSkeleton";

const ProfilePage = () => {

  return (
        <>
        <Suspense fallback={<HeaderSkeleton navbarOnly={true} />}>
          <Header navbarOnly={true} />
        </Suspense>
          <UserAuthProtected>
            <div>
                <Profile/>
            </div>
          </UserAuthProtected>
       </>
  );
};

export default ProfilePage;