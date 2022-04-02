// Reducer action types for setting state
export const SET_DAY = "SET_DAY"
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA"
export const SET_INTERVIEW = "SET_INTERVIEW"

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      const { day } = action
      return { ...state, day }
    case SET_APPLICATION_DATA:
      const { days, appointments, interviewers } = action
      return { ...state, days, appointments, interviewers }
    case SET_INTERVIEW: {
      const { id, interview } = action
      const appointment = {
        ...state.appointments[id],
        interview: interview ? { ...interview } : null,
      }

      const appointments = {
        ...state.appointments,
        [id]: appointment,
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

// Get back updated days array using copies of state, appointments, id
function updateSpots(state, appointments, id) {
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
