"use client";
import React, { useEffect, useState } from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export default function ShowData() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from our (mocked) API
    fetch("https://api.example.com/user")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => setError("Failed to load user"));
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!user) return <div className="animate-pulse">Loading User...</div>;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <h3 className="mb-1 text-sm font-medium text-zinc-400">
        Authenticated User
      </h3>
      <div className="text-primary text-2xl font-bold">
        {user.firstName} {user.lastName}
      </div>
      <div className="mt-2 text-xs text-zinc-500">ID: {user.id}</div>
    </div>
  );
}
