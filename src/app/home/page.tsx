"use client";

import { useAuth } from "../_util/authContext";

export default function HomePage() {
  const { user } = useAuth();
  console.log(user);

  return <div>Homepage</div>;
}
