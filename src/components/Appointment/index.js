import React from "react"
import "components/Appointment/styles.scss"

import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm"
import Error from "components/Appointment/Error"

import useVisualMode from "../../hooks/useVisualMode"

const Appointment = (props) => {
  const EMPTY = "EMPTY"
  const SHOW = "SHOW"
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const EDITING = "EDITING"
  const ERROR_DELETE = "ERROR_DELETE"
  const ERROR_SAVE = "ERROR_SAVE"

  // Condition (ternary) that checks if the appointment has an interview
  // If it does, it will render the Show component
  // If it doesn't, it will render the Empty component
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    }
    transition(SAVING) // transition to SAVING mode (shows the spinner) and then transition to SHOW mode (shows the appointment) after the save is complete
    props
      .bookInterview(props.id, interview) // bookInterview is a function passed down from the parent component (AppointmentList) and it takes in the id of the appointment and the interview
      .then(() => transition(SHOW)) // transition to SHOW mode after the save is complete (shows the appointment)
      .catch((error) => transition(ERROR_SAVE, true)) // transition to ERROR_SAVE mode if there is an error
  }

  function cancel() {
    transition(CONFIRM) // transition to CONFIRM mode (shows the confirmation message) and then transition to EMPTY mode (shows the empty state) after the save is complete
  }

  function destroy() {
    transition(DELETING, true) // transition to DELETING mode (shows the spinner) and then transition to EMPTY mode (shows the empty state) after the save is complete
    props
      .cancelInterview(props.id) // cancel the interview and then transition to EMPTY mode (shows the empty state) after the save is complete
      .then(() => transition(EMPTY)) // transition to EMPTY mode (shows the empty state) after the save is complete
      .catch((error) => transition(ERROR_DELETE, true)) // transition to ERROR_DELETE mode if there is an error
  }

  function edit(name, interviewer) {
    transition(EDITING) // transition to EDITING mode
  }

  function close() {
    mode === ERROR_SAVE && back() // if the mode is ERROR_SAVE, transition back to the SHOW mode
    mode === ERROR_DELETE && back() // if the mode is ERROR_DELETE, transition back to the SHOW mode
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE)
          }}
          id={props.id}
        />
      )}

      {mode === SHOW && (
        <Show
          id={props.id}
          time={props.time}
          interview={props.interview}
          onDelete={cancel}
          onEdit={edit}
        />
      )}

      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message={"Saving..."} />}

      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete this?"
          onConfirm={destroy}
          onCancel={back}
        />
      )}
      {mode === DELETING && <Status message={"Deleting..."} />}

      {mode === EDITING && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error message={"Could not cancel appointment"} onClose={close} />
      )}
      {mode === ERROR_SAVE && (
        <Error message={"Could not save appointment"} onClose={close} />
      )}
    </article>
  )
}

export default Appointment
