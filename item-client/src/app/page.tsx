"use client";

import { useState } from "react";

// Define the type for an item
type Item = {
  id: string;
  name: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/items`);
      if (!response.ok) {
        throw new Error(`Failed to fetch items: ${response.statusText}`);
      }
      const data: Item[] = await response.json();
      setItems(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Item name cannot be empty.");
      return;
    }
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        throw new Error(`Failed to add item: ${response.statusText}`);
      }
      const newItem: Item = await response.json();
      setItems((prevItems) => [...prevItems, newItem]);
      setName("");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "auto",
        color: "#333",
      }}
    >
      <h1
        style={{
          fontSize: "1.5rem",
          marginBottom: "1rem",
          textAlign: "center",
          color: "#ffffff",
        }}
      >
        Item Management
      </h1>

      {error && (
        <p style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}>
          {error}
        </p>
      )}

      <form
        onSubmit={addItem}
        style={{ display: "flex", marginBottom: "1.5rem", gap: "0.5rem" }}
      >
        <input
          type='text'
          placeholder='Enter item name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            flex: "1",
            padding: "0.5rem",
            backgroundColor: "#fff",
            color: "#333",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          disabled={submitting}
        />
        <button
          type='submit'
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: submitting ? "not-allowed" : "pointer",
          }}
          disabled={submitting}
        >
          {submitting ? "Adding..." : "Add Item"}
        </button>
      </form>

      <button
        onClick={fetchItems}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "1rem",
          width: "100%",
        }}
      >
        {loading ? "Loading items..." : "Retrieve Items"}
      </button>

      {items.length > 0 ? (
        <ul
          style={{
            listStyleType: "none",
            padding: "0",
            border: "1px solid #ddd",
            borderRadius: "4px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f9f9f9",
          }}
        >
          {items.map((item) => (
            <li
              key={item.id}
              style={{
                padding: "0.75rem",
                borderBottom: "1px solid #ddd",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#333" }}>{item.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        !loading && (
          <p style={{ textAlign: "center", color: "#666" }}>
            No items found. Click &quot; Retrieve Items &quot; to load items.
          </p>
        )
      )}
    </div>
  );
}
