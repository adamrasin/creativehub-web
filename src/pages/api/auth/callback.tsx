// pages/auth/callback.tsx
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace("#", "?")); // #access_token=... => ?access_token=...

    const token = params.get("access_token");

    if (token) {
      localStorage.setItem("token", token);
      router.push("/profile"); // redirect na profil
    } else {
      router.push("/login");
    }
  }, [router]);

  return <p>Probíhá přihlášení...</p>;
}
