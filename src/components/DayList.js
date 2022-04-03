import React from "react"
import DayListItem from "./DayListItem"
//import {days} from "../../stories/index";

export default function DayList(props) {
  return (
    <ul>
      {props.days.map((day) => {
        return (
          <DayListItem
            key={day.name}
            name={day.name}
            spots={day.spots}
            selected={day.name === props.day}
            setDay={(event) => {
              props.setDay(day.name)
            }}
          />
        )
      })}
    </ul>
  )
}
