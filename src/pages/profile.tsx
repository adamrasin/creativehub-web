import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/navbar";

type User = {
  id: number;
  email: string;
  username: string;
  // můžeš přidat další fields podle toho, co Strapi posílá
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/login");
    return;
  }

  fetch("http://localhost:1337/api/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Neplatný token");
      return res.json();
    })
    .then(setUser)
    .catch(() => {
      localStorage.removeItem("token");
      router.push("/login");
    });
}, []);


  if (!user) return <div>Načítání profilu...</div>;

  return (
    <div>
      <Navbar />
      <h1>Profil</h1>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          router.push("/login");
        }}
      >
        Odhlásit se
      </button>
    </div>
  );
}

