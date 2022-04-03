export const getAppointmentsForDay = (state, day) => {
  const dayAppointments = state.days.find((d) => d.name === day)
  if (!dayAppointments) return []

  return dayAppointments.appointments.map((id) => state.appointments[id])
}

export const getInterviewersForDay = (state, name) => {
  const dayInterviewers = state.days.find((d) => d.name === name)
  if (!dayInterviewers) return []

  return dayInterviewers.interviewers.map((id) => state.interviewers[id])
}

export const getInterview = (state, interview) => {
  if (!interview) return null

  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  }
}
