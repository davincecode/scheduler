import { useEffect, useReducer } from "react"
import axios from "axios"

const SET_DAY = "SET_DAY"
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA"
const SET_INTERVIEW = "SET_INTERVIEW"

function reducer(state, action) {
  const { day, days, appointments, interviewers, id, interview } = action

  switch (action.type) {
    case SET_DAY:
      return { ...state, day }
    case SET_APPLICATION_DATA:
      return { ...state, days, appointments, interviewers }
    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview },
      }

      const appointments = {
        ...state.appointments,
        [id]: appointment,
      }

      function updateSpots(state, appointments) {
        const days = state.days.map((day) => {
          return { ...day }
        })

        function findDay(day) {
          const daysOfWeek = {
            Monday: 0,
            Tuesday: 1,
            Wednesday: 2,
            Thursday: 3,
            Friday: 4,
          }
          return daysOfWeek[day]
        }

        const dayIndex = findDay(state.day)

        const prevState = state.appointments[id].interview

        const newState = appointments[id].interview

        if (!prevState && newState) {
          days[dayIndex].spots--
        }

        if (prevState && !newState) {
          days[dayIndex].spots++
        }

        return days
      }

      const days = updateSpots(state, appointments, id)

      return { ...state, appointments, days }
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      )
  }
}

function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  })

  // const setDay = (day) => setState({ ...state, day });
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

  return { setDay, bookInterview, cancelInterview, state }
}

export default useApplicationData
