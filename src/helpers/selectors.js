export function getAppointmentsForDay(state, day) {
  const appointmentsArray = state.days.find(
    (appointments) => appointments.name === day
  )
  const appointments =
    appointmentsArray &&
    appointmentsArray.appointments.map((id) => state.appointments[id])
  return appointments || []
}

export function getInterview(state, interview) {
  if (!interview) return null
  const student = interview.student
  const interviewer = state.interviewers[interview.interviewer]
  return { interviewer, student }
}
