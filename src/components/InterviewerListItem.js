import React from "react"
import "components/InterviewerListItem.scss"
import classNames from "classnames"

const InterviewerListItem = (props) => {
  const { name, avatar, selected, setInterviewer } = props

  const classNameItem = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  })
  const classNameImage = classNames("interviewers__item-image", {
    "interviewers__item-image--selected": selected,
  })

  return (
    <li className={classNameItem} onClick={setInterviewer}>
      <img className={classNameImage} src={avatar} alt={name} />
      {selected && name}
    </li>
  )
}

export default InterviewerListItem
