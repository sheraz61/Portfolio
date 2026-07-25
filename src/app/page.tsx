export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 text-center bg-gray-50">
      <div className="max-w-3xl animate-[pulse_2s_ease-in-out_infinite]">
        <h1 className="text-4xl sm:text-6xl font-black tracking-wide text-red-600 drop-shadow-sm">
          Portfolio Under Development
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-700">
          This page is currently being built. Please check back soon for the full experience.
        </p>
        <p className="mt-4 text-sm sm:text-base italic text-red-500">
          “Great things are worth waiting for — especially when they are still being polished.”
        </p>
      </div>
    </main>
  );
}