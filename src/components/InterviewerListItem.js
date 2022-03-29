import React from "react"
import classNames from "classnames"

import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {
  const { selected, avatar, name, setInterviewer } = props
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  })

  return (
    <li onClick={setInterviewer} className={interviewerClass}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  )
}

// Previous code
// export default function InterviewerListItem(props) {
//   const { id, name, avatar, selected, setInterviewer } = props
//   const interviewerClass = classNames("interviewers__item", {
//     "interviewers__item--selected": selected,
//     "interviewers__item-image": avatar,
//   })
//   return (
//     <>
//       <li className={interviewerClass} onClick={() => setInterviewer(id)}>
//         <img className={interviewerClass} src={avatar} alt={name} />
//         {selected && name}
//       </li>
//     </>
//   )
// }
