import React from "react"

import DayListItem from "./DayListItem"

export default function DayList(props) {
  const { days, value, onChange } = props
  const dayList = days.map((item) => {
    return (
      <DayListItem
        key={item.id}
        spots={item.spots}
        name={item.name}
        selected={item.name === value}
        setDay={() => onChange(item.name)}
      />
    )
  })

  return <ul>{dayList}</ul>
}
