import React from "react"

import "components/InterviewerList.scss"
import InterviewerListItem from "components/InterviewerListItem"

export default function InterviewerList(props) {
  const { interviewers, interviewer, setInterviewer } = props
  const interviewList = interviewers.map((item) => {
    return (
      <InterviewerListItem
        key={item.id}
        name={item.name}
        avatar={item.avatar}
        selected={item.id === interviewer}
        setInterviewer={() => setInterviewer(item.id)}
      />
    )
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewList}</ul>
    </section>
  )
}
