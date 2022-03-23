import classNames from "classnames"
import "components/InterviewerListItem.scss"
import React from "react"

export default function InterviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
    "interviewers__item-image": avatar,
  })
  return (
    <>
      <li className={interviewerClass} onClick={() => setInterviewer(id)}>
        <img className={interviewerClass} src={avatar} alt={name} />
        {selected && name}
      </li>
    </>
  )
}
