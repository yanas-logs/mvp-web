import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const handleGenerate = async () => {
    try {
      // sementara dummy API lokal
      const res = await fetch("http://localhost:3000/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setAudioUrl(data.url); // misalnya backend balikin URL file audio
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Voice Prompter AI</h1>
      <textarea
        className="w-full border p-2 mb-4"
        rows={4}
        placeholder="Masukkan teks iklan..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Generate Audio
      </button>

      {audioUrl && (
        <div className="mt-4">
          <audio controls src={audioUrl}></audio>
        </div>
      )}
    </div>
  );
}

export default App;
