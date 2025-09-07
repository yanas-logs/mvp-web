import { useState } from "react"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"

function App() {
  const [text, setText] = useState("")
  const [audioUrl, setAudioUrl] = useState("")

  const handleGenerate = async () => {
    try {

      const res = await fetch("http://localhost:3000/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })

      const data = await res.json()
      setAudioUrl(data.url)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Voice Prompter AI</h1>

      <Textarea
        placeholder="Input text..."
        value={text}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setText(e.target.value)
        }
        rows={4}
      />

      <Button onClick={handleGenerate}>Generate Audio</Button>

      {audioUrl && (
        <div className="mt-4">
          <audio controls src={audioUrl}></audio>
        </div>
      )}
    </div>
  )
}

export default App
