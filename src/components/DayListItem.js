import React from "react"
import "components/DayListItem.scss"
import classNames from "classnames"

export default function DayListItem(props) {
  const { setDay, selected, spots, name } = props

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  })

  const formatSpots = () => {
    if (spots === 0) {
      return <h3 className="text--light">no spots remaining</h3>
    } else if (spots === 1) {
      return <h3 className="text--light">1 spot remaining</h3>
    } else if (spots > 1) {
      return <h3 className="text--light">{spots} spots remaining</h3>
    }
  }

  return (
    <li className={dayClass} onClick={() => setDay(name)} selected={selected}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  )
}

// // Previous code
// return (
//   <li className={dayClass} onClick={() => setDay(name)}>
//     <h2 className="text--regular">{name}</h2>
//     {formatSpots()}
//   </li>
// )
