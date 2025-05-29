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
    <div className="min-h-screen bg-creativeGreen text-white">
      <Navbar />
      <div className="flex items-center justify-center py-12 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white text-black rounded-xl shadow-lg p-8 space-y-6"
        >
          <h1 className="text-2xl font-bold text-center text-creativeGreen">
            Registrace na událost
          </h1>

          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Jméno
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-creativeGreen"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-creativeGreen"
            />
          </div>

          <div>
            <label htmlFor="eventId" className="block mb-1 font-medium">
              ID události
            </label>
            <input
              id="eventId"
              name="eventId"
              value={form.eventId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-creativeGreen"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-creativeGreen text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Odeslat přihlášku
          </button>

          {successMessage && (
            <p className="text-center text-green-600 font-semibold">
              {successMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
