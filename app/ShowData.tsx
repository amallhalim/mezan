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
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
      <h3 className="text-sm font-medium text-zinc-400 mb-1">
        Authenticated User
      </h3>
      <div className="text-2xl font-bold text-primary">
        {user.firstName} {user.lastName}
      </div>
      <div className="text-xs text-zinc-500 mt-2">ID: {user.id}</div>
    </div>
  );
}
