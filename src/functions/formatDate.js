export const formatDate = function(date){
  date = new Date(date)
  date = date.getDay()
  let days = ['SUN','MON','TUE','WED','THU','FRI','SAT']
  return(days[date])
}