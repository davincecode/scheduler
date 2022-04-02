/* Gets appointments for specific day and returns array of appointments*/
export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((stateDay) => stateDay.name === day)

  if (filteredDays.length === 0) return []

  const appointmentsArr = filteredDays[0].appointments.map((id) => {
    return state.appointments[id]
  })
  return appointmentsArr
}

/* Gets interviewers for specific day and returns array of interviewers */
export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter((stateDay) => stateDay.name === day)

  if (filteredDays.length === 0) return []

  const interviewersArr = filteredDays[0].interviewers.map((id) => {
    return state.interviewers[id]
  })
  return interviewersArr
}

/* Returns object with student and interview object */
export function getInterview(state, interview) {
  if (!interview) {
    return null
  }

  return {
    ...interview,
    interviewer: state.interviewers[interview.interviewer],
  }
}

// export function getAppointmentsForDay(state, day) {
//   const { days, appointments } = state
//   const dayFromState = days.filter((el) => el.name === day)

//   let ids
//   dayFromState[0] ? (ids = dayFromState[0].appointments) : (ids = [])

//   if (appointments) {
//     return Object.values(appointments).filter((el) => ids.includes(el.id))
//   } else {
//     return []
//   }
// }

// export function getInterviewersForDay(state, day) {
//   const { days, interviewers } = state
//   const dayFromState = days.filter((el) => el.name === day)

//   let ids
//   dayFromState[0] ? (ids = dayFromState[0].interviewers) : (ids = [])

//   if (interviewers) {
//     return Object.values(interviewers).filter((el) => ids.includes(el.id))
//   } else {
//     return []
//   }
// }

// export function getInterview(state, interview) {
//   let id = interview ? interview.interviewer : null

//   if (id) {
//     const obj = {
//       student: interview.student,
//       interviewer: Object.values(state.interviewers)[id - 1],
//     }
//     return obj
//   } else {
//     return null
//   }
// }
