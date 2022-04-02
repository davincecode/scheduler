import { useEffect, useReducer } from "react"
import axios from "axios"

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
} from "reducers/application"

// Sets initial state, API setup/calls, and websocket connection
export function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  })

  const setDay = (day) => dispatch({ type: SET_DAY, day })

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      dispatch({ type: SET_INTERVIEW, id, interview })
    })
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      dispatch({ type: SET_INTERVIEW, id, interview: null })
    })
  }

  // Initial axios call for populating data from database
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      })
    })
  }, [])

  // Create websocket connection once the page renders
  useEffect(() => {
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL)
    // Initialize open connection
    webSocket.onopen = function (event) {
      webSocket.onmessage = function (event) {
        // Parse server response data
        const data = JSON.parse(event.data)

        // Dispatch data when receiving server response
        if (data.type === "SET_INTERVIEW") {
          dispatch({
            type: SET_INTERVIEW,
            interview: data.interview,
            id: data.id,
          })
        }
      }
    }
    // Clean up by closing websocket connection
    return () => {
      webSocket.close()
    }
  }, [])

  return { setDay, bookInterview, cancelInterview, state }
}

export default useApplicationData
