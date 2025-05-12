import React, { useState } from "react";
import Navbar from "../components/navbar";

export default function RegistrationPage() {
  const [form, setForm] = useState({ name: "", email: "", eventId: "" });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:1337/api/registrations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          name: form.name,
          email: form.email,
          event: form.eventId,
        },
      }),
    });

    if (res.ok) {
      setSuccessMessage("Díky za registraci!");
      setForm({ name: "", email: "", eventId: "" });

      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <label>
          Jméno:
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          ID události:
          <input name="eventId" value={form.eventId} onChange={handleChange} required />
        </label>
        <button type="submit">Odeslat přihlášku</button>
      </form>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
}
