import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FC } from "react"
import { Button } from "../ui/button"

interface APIStepProps {
  // Only keep Ollama-related props
  ollamaUrl: string
  onOllamaUrlChange: (value: string) => void
}

export const APIStep: FC<APIStepProps> = ({ ollamaUrl, onOllamaUrlChange }) => {
  return (
    <>
      <div className="mt-5 space-y-2">
        <Label>Ollama URL</Label>
        <Input
          placeholder="http://localhost:11434"
          type="text"
          value={ollamaUrl}
          onChange={e => onOllamaUrlChange(e.target.value)}
        />
        <div className="text-muted-foreground text-xs">
          Enter the URL where your Ollama server is running. Default is
          http://localhost:11434
        </div>
      </div>
    </>
  )
}
