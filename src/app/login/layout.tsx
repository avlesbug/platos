"use client";

import "~/styles/globals.css";

import { ModularHeader } from "../_components/ModularHeader";
import { redirect } from "next/navigation";
import { useAuth } from "../_util/authContext";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  useEffect(() => {
    console.log("Something changed");
    if (user && !loading) {
      redirect("/myrecipes");
    }
  }, [loading, user]);
  return (
    <>
      <ModularHeader />
      <div className="body-container">
        <div className="center-content">{children}</div>
      </div>
    </>
  );
}
