import { useEffect, useReducer } from "react"
import axios from "axios"

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
} from "reducers/application"

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

  useEffect(() => {
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL)

    webSocket.onopen = function (event) {
      webSocket.onmessage = function (event) {
        const data = JSON.parse(event.data)

        if (data.type === "SET_INTERVIEW") {
          dispatch({
            type: SET_INTERVIEW,
            interview: data.interview,
            id: data.id,
          })
        }
      }
    }
    return () => {
      webSocket.close()
    }
  }, [])

  return { setDay, bookInterview, cancelInterview, state }
}

export default useApplicationData
