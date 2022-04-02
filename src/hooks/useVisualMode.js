import { useState } from "react"

/* 
Custom hook for managing mode state (which handles transitions). Utilizes Stack data structure
*/
export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial])
  const transition = (newMode, replace = false) => {
    setHistory((prev) => {
      if (replace) return [newMode, ...prev.slice(1)]
      return [newMode, ...prev]
    })
  }

  const back = () => {
    setHistory((prev) => {
      if (prev.length <= 1) return prev
      return prev.slice(1)
    })
  }
  const mode = history[0]

  return { mode, transition, back }
}
