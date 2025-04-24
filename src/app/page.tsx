"use client";

import { AppUser } from "@/types/user";
import { useState, useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState<AppUser[]>([]);

  useEffect(() => {
    fetch("/api/bff/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Usuários</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>👤 {user.name}</li>
        ))}
      </ul>
    </main>
  );
}
