import { useState } from "react"
/* 
Custom hook for managing mode state (which handles transitions). Utilizes Stack data structure
*/
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  function transition(newMode, replace = false) {
    if (!replace) {
      setHistory((prev) => [...prev, newMode])
    } else {
      setHistory(history.slice(0, -1))
      setHistory((prev) => [...prev, newMode])
    }
    setMode(newMode)
  }

  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 2])
      setHistory(history.slice(0, -1))
    }
  }

  return { mode, transition, back }
}
