import React, { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    const token = new URLSearchParams(window.location.hash).get("access_token");

    if (token) {
      localStorage.setItem("token", token);
      window.location.href = "/profile";
    }
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:1337/api/connect/google";
  };

  return (
    <div>
      <h1>Přihlášení</h1>
      <button onClick={handleGoogleLogin}>Přihlásit se přes Google</button>
    </div>
  );
}