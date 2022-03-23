import React from "react"
import "components/DayListItem.scss"
import classNames from "classnames"

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  })

  const formatSpots = () => {
    if (props.spots === 0) {
      return <h3 className="dayClass">no spots remaining</h3>
    } else if (props.spots === 1) {
      return <h3 className="dayClass">1 spot remaining</h3>
    } else if (props.spots > 1) {
      return <h3 className="dayClass">{props.spots} spots remaining</h3>
    }
  }

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2>
      <h2 className="dayClass">{props.name}</h2>
      {formatSpots()}
    </li>
  )
}
