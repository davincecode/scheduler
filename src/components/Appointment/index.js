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

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    }

    if (name && interviewer) {
      props
        .bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch((error) => transition(ERROR_SAVE, true))
    } else {
      transition(ERROR_SAVE)
    }
  }

  function cancel() {
    transition(CONFIRM)
  }

  function destroy() {
    transition(DELETING, true)
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true))
  }

  function edit(name, interviewer) {
    transition(EDITING)
  }

  function close() {
    mode === ERROR_SAVE && back()
    mode === ERROR_DELETE && back()
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
