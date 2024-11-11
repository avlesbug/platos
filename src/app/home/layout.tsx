"use client";

import "~/styles/globals.css";

import { ModularHeader } from "../_components/ModularHeader";
import { useAuth } from "../_util/authContext";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  // if (user) {
  //   redirect("/myrecipes");
  // }
    redirect("/login");
  return (
    <>
      <ModularHeader showLogginButton={true} />
      <div className="body-container">
        <div>{children}</div>
      </div>
    </>
  );
}
