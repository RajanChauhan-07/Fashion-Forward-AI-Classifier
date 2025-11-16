// src/lib/api.ts

// Always require API URL in production
export const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.warn("⚠️ VITE_API_URL is missing! Falling back to localhost...");
}

const BASE_URL = API_URL || "http://localhost:8000";

// Helper for file uploads
export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/predict`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Backend request failed");
  return res.json();
}
