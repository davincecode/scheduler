import { useState, useEffect } from "react"
import axios from "axios"

// Sets initial state, API setup/calls, and websocket connection
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  })

  // Initial axios call for populating data from database
  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers"),
    ]).then((all) => {
      setState((prev) => {
        return {
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }
      })
    })
  }, [])

  const setDay = (day) => setState((prev) => ({ ...prev, day }))

  const updateSpots = (incomingState, appointments, day) => {
    const state = { ...incomingState }
    const currentDay = day || state.day

    const currentDayObj = state.days.find(
      (dayObj) => dayObj.name === currentDay
    )
    const currentDayIndex = state.days.findIndex(
      (dayObj) => dayObj.name === currentDay
    )

    const listOfAppointmentIds = currentDayObj.appointments

    const listOfNullAppointments = listOfAppointmentIds.filter(
      (id) => !appointments[id].interview
    )

    const spots = listOfNullAppointments.length

    const updatedDayObj = { ...currentDayObj, spots }

    const days = state.days

    days[currentDayIndex] = updatedDayObj

    return days
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    }

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const updatedDays = updateSpots(state, appointments, state.day)

      setState({
        ...state,
        appointments,
        days: updatedDays,
      })
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    }

    return axios.delete(`/api/appointments/${id}`).then(() => {
      const updatedDays = updateSpots(state, appointments, state.day)

      setState({
        ...state,
        appointments,
        days: updatedDays,
      })
    })
  }

  return { state, setDay, bookInterview, cancelInterview }
}
