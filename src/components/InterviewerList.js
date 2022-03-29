import React from "react"
import PropTypes from "prop-types"

import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem"

function InterviewerList(props) {
  const { interviewers, value, onChange } = props

  const interviewerList = interviewers.map((interviewerItem) => {
    return (
      <InterviewerListItem
        key={interviewerItem.id}
        name={interviewerItem.name}
        avatar={interviewerItem.avatar}
        selected={interviewerItem.id === value}
        setInterviewer={() => onChange(interviewerItem.id)}
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
}

export default InterviewerList

// Previous code
// export default function InterviewerList(props) {
//   const { interviewers, interviewer, setInterviewer } = props
//   const interviewList = interviewers.map((item) => {
//     return (
//       <InterviewerListItem
//         key={item.id}
//         name={item.name}
//         avatar={item.avatar}
//         selected={item.id === interviewer}
//         setInterviewer={() => setInterviewer(item.id)}
//       />
//     )
//   })
//   return (
//     <section className="interviewers">
//       <h4 className="interviewers__header text--light">Interviewer</h4>
//       <ul className="interviewers__list">{interviewList}</ul>
//     </section>
//   )
// }
