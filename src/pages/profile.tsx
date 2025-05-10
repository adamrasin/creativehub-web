import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

type User = {
  id: number;
  username: string;
  email: string;
  provider: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:1337/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  if (loading) return <p>Načítám profil…</p>;

  if (!user) return <p>Nejste přihlášen. <a href="/login">Přihlásit se</a></p>;

  return (
    <div>
      <h1>Váš profil</h1>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Uživatel:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Přes:</strong> {user.provider}</p>

      <button onClick={handleLogout} style={{ marginTop: "1rem" }}>
        Odhlásit se
      </button>
    </div>
  );
}
