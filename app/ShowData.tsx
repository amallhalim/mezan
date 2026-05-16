"use client";
import React, { useEffect, useState } from "react";

import { useTranslations } from "next-intl";

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export default function ShowData() {
  const t = useTranslations("ShowData");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from our (mocked) API
    fetch("https://api.example.com/user")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => setError(t("error")));
  }, [t]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!user) return <div className="animate-pulse">{t("loading")}</div>;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <h3 className="mb-1 text-sm font-medium text-zinc-400">{t("title")}</h3>
      <div className="text-primary text-2xl font-bold">
        {user.firstName} {user.lastName}
      </div>
      <div className="mt-2 text-xs text-zinc-500">
        {t("userId", { id: user.id })}
      </div>
    </div>
  );
}
