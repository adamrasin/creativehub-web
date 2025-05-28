import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { id_token } = req.body;
  console.log("ID Token received:", id_token);

  try {
    const googleUser = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`
    );

    console.log("Google user verified:", googleUser.data);

    const { email, name } = googleUser.data;

    const response = await axios.post("http://localhost:1337/api/auth/google-auth", {
      email,
      username: name,
    });

    console.log("Strapi responded with:", response.data);

    res.status(200).json(response.data);
  } catch (err: any) {
    console.error("API error:", err.response?.data || err.message);
    res.status(500).json({ error: "Auth failed" });
  }
}
