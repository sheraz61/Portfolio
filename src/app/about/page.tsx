import ContactButton from "@/components/ContactButton";

export default function About() {
  return (
    <main className="min-h-screen px-6 py-16 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">About Me</h1>
      <p className="text-gray-600 leading-relaxed">
        I&apos;m a MERN Stack Developer with a growing interest in AI. I build
        scalable, production ready web applications using React, Next.js,
        Node.js, Express, and MongoDB.
      </p>

      <ContactButton />
    </main>
  );
}