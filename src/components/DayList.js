import React from "react"

import DayListItem from "./DayListItem"

export default function DayList(props) {
  const { days, value, setDay } = props
  const dayList = days.map((item) => {
    return (
      <DayListItem
        key={item.id}
        spots={item.spots}
        name={item.name}
        selected={item.name === value}
        setDay={setDay}
      />
    )
  })

  return <ul>{dayList}</ul>
}
