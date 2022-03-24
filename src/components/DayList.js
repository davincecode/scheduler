import React from "react"

import DayListItem from "components/DayListItem"

export default function DayList(props) {
  const { days, onChange, value } = props
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

  // return <ul>{dayList}</ul>
  return { dayList }
}

// Previous code
// <DayListItem
//   key={item.id}
//   spots={item.spots}
//   name={item.name}
//   selected={item.name === day}
//   setDay={setDay}
// />
