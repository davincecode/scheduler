import React from "react"

import "components/InterviewerList.scss"
import InterviewerListItem from "components/InterviewerListItem"

export default function InterviewerList(props) {
  const { value, onChange } = props
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === value}
        setInterviewer={() => onChange(interviewer.id)}
      />
    )
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )
}

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
