"use client";

import { useState } from "react";

export default function ContactButton() {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <div className="mt-6">
      <button
        onClick={() => setClicked(true)}
        className="px-5 py-2 rounded-md bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
      >
        {clicked ? "Thanks for reaching out!" : "Contact Me"}
      </button>
    </div>
  );
}