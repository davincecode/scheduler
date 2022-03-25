export function getAppointmentsForDay(state, day) {
  const { days, appointments } = state
  const dayFromState = days.filter((el) => el.name === day)

  let ids
  dayFromState[0] ? (ids = dayFromState[0].appointments) : (ids = [])

  if (appointments) {
    return Object.values(appointments).filter((el) => ids.includes(el.id))
  } else {
    return []
  }
}

export function getInterviewersForDay(state, day) {
  const { days, interviewers } = state
  const dayFromState = days.filter((el) => el.name === day)

  let ids
  dayFromState[0] ? (ids = dayFromState[0].interviewers) : (ids = [])

  if (interviewers) {
    return Object.values(interviewers).filter((el) => ids.includes(el.id))
  } else {
    return []
  }
}

export function getInterview(state, interview) {
  let id = interview ? interview.interviewer : null

  if (id) {
    const obj = {
      student: interview.student,
      interviewer: Object.values(state.interviewers)[id - 1],
    }
    return obj
  } else {
    return null
  }
}
