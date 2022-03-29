import React from "react"
import classNames from "classnames"

import "components/DayListItem.scss"

export default function DayListItem(props) {
  const { spots, selected, name, setDay } = props
  const formatSpots = function () {
    if (spots === 0) {
      return <h3 className="text--light">no spots remaining</h3>
    } else if (spots === 1) {
      return <h3 className="text--light">1 spot remaining</h3>
    } else if (spots > 1) {
      return <h3 className="text--light">{spots} spots remaining</h3>
    }
  }

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  })

  return (
    <li onClick={setDay} className={dayClass}>
      <h2 className="text--regular">{name}</h2>
      {formatSpots()}
    </li>
  )
}
