// src/lib/api.ts
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Helper for file uploads
export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/predict`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Backend request failed");
  return res.json();
}
