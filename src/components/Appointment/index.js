import React, { Fragment } from "react"

import "components/Appointment/styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"
import useVisualMode from "hooks/useVisualMode"

export default function Appointment(props) {
  const { id, time, interviewers, bookInterview, cancelInterview, interview } =
    props

  const EMPTY = "EMPTY"
  const SHOW = "SHOW"
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    }
    transition(SAVING)
    bookInterview(id, interview)
      .then(() => {
        transition(SHOW)
      })
      .catch((error) => {
        transition(ERROR_SAVE, true)
      })
  }

  function confirmDelete() {
    transition(CONFIRM)
  }

  function deleteInterview(id) {
    transition(DELETING, true)
    cancelInterview(id)
      .then(() => {
        transition(EMPTY)
      })
      .catch((error) => {
        transition(ERROR_DELETE, true)
      })
  }

  function edit() {
    transition(EDIT)
  }

  return (
    <Fragment>
      <Header time={time} />
      <article className="appointment">
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            id={id}
            student={interview.student}
            interviewer={interview.interviewer}
            onDelete={() => confirmDelete()}
            onEdit={() => edit()}
          />
        )}
        {mode === CONFIRM && (
          <Confirm
            onCancel={() => back()}
            message="Are you sure you want to delete this interview session?"
            onConfirm={() => deleteInterview(id)}
          />
        )}
        {mode === EDIT && (
          <Form
            interviewers={interviewers}
            student={interview.student}
            interviewer={interview.interviewer.id}
            onCancel={() => back()}
            onSave={save}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error
            onClose={() => back()}
            message="Error, cannot save appointment. Please try again."
          />
        )}
        {mode === ERROR_DELETE && (
          <Error
            onClose={() => back()}
            message="Error, cannot delete appointment. Please try again."
          />
        )}
        {mode === SAVING && <Status message="Saving" />}
        {mode === DELETING && <Status message="Deleting" />}
        {mode === CREATE && (
          <Form
            interviewers={interviewers}
            onCancel={() => back()}
            onSave={save}
          />
        )}
      </article>
    </Fragment>
  )
}
