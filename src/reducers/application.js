// Action types for reducer
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
      // console.log("ACTION: ", action);
      const { id, interview } = action
      const appointment = {
        ...state.appointments[id],
        interview: interview ? { ...interview } : null,
      }

      const appointments = {
        ...state.appointments,
        [id]: appointment,
      }

      // function updateSpots(state, appointments) {
      //   // make copy of days array
      //   const days = state.days.map((day) => {
      //     return { ...day };
      //   });

      //   // console.log("DAYS: ", days);

      //   function findDay(day) {
      //     const daysOfWeek = {
      //       Monday: 0,
      //       Tuesday: 1,
      //       Wednesday: 2,
      //       Thursday: 3,
      //       Friday: 4,
      //     };
      //     return daysOfWeek[day];
      //   }
      //   // find the day's index in days array
      //   const dayIndex = findDay(state.day);
      //   // console.log("STATE.DAY: ", state.day);
      //   // console.log("DAYINDEX: ", dayIndex);

      //   // check for old state
      //   const prevState = state.appointments[id].interview;
      //   // console.log("prevSTATE: ", prevState);
      //   // check for new state
      //   const newState = appointments[id].interview;
      //   // console.log("newSTATE: ", newState);

      //   // create - no old state + new state
      //   if (!prevState && newState) {
      //     days[dayIndex].spots--;
      //   }
      //   // delete - old state + no new state
      //   if (prevState && !newState) {
      //     days[dayIndex].spots++;
      //   }

      //   // return days array
      //   return days;
      // }

      const days = updateSpots(state, appointments, id)

      return { ...state, appointments, days }
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      )
  }
}

function updateSpots(state, appointments, id) {
  // make copy of days array
  const days = state.days.map((day) => {
    return { ...day }
  })

  // console.log("DAYS: ", days);

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
  // find the day's index in days array
  const dayIndex = findDay(state.day)
  // console.log("STATE.DAY: ", state.day);
  // console.log("DAYINDEX: ", dayIndex);

  // check for old state
  const prevState = state.appointments[id].interview
  // console.log("prevSTATE: ", prevState);
  // check for new state
  const newState = appointments[id].interview
  // console.log("newSTATE: ", newState);

  // create - no old state + new state
  if (!prevState && newState) {
    days[dayIndex].spots--
  }
  // delete - old state + no new state
  if (prevState && !newState) {
    days[dayIndex].spots++
  }

  // return days array
  return days
}
