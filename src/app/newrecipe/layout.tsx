"use client";
import "~/styles/globals.css";

import { ModularHeader } from "../_components/ModularHeader";
import { useAuth } from "../_util/authContext";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!user && !loading) {
      redirect("/login");
    }
  }, [loading]);
  return (
    <>
      <ModularHeader />
      <div className="body-container">
        <div className="recipe-preview-page">{user && <>{children}</>}</div>
      </div>
    </>
  );
}
