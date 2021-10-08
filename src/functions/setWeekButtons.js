export const setWeekButtons = function(position, week, totalWeeks, setWeek){
  if (week !== 1 || week !== totalWeeks) {
    if (position === 1) setWeek(week => week - 1)
    if (position === 2) setWeek(week => week)
    if (position === 3) setWeek(week => week + 1)
  }
  
  if (week === 1) {
    if (position === 1) setWeek(1)
    if (position === 2) setWeek(2)
    if (position === 3) setWeek(3)
  }

  if (week === totalWeeks) {
    if (position === 1) setWeek(totalWeeks-2)
    if (position === 2) setWeek(totalWeeks-1)
    if (position === 3) setWeek(totalWeeks)
  }
}
