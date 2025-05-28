import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../components/navbar";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div>
      <Navbar />
      <h1>Přihlášení</h1>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const id_token = credentialResponse.credential;
          if (!id_token) return;

          const res = await axios.post("/api/auth/google", { id_token });

          if (res.data.jwt) {
            localStorage.setItem("token", res.data.jwt);
            router.push("/profile");
          } else {
            alert("Přihlášení selhalo");
          }
        }}
        onError={() => {
          alert("Google login selhal");
        }}
      />
    </div>
  );
}
