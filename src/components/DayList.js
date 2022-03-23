import React from "react"

import DayListItem from "components/DayListItem"

export default function DayList(props) {
  const { days, day, setDay } = props
  const dayList = days.map((item) => {
    return (
      <DayListItem
        key={item.id}
        spots={item.spots}
        name={item.name}
        selected={item.name === day}
        setDay={setDay}
      />
    )
  })

  return <ul>{dayList}</ul>
}
