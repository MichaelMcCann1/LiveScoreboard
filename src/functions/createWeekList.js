export const createWeekList = function(totalWeeks){
  let weekList = []
  for (let i=1; i<totalWeeks+1; i++){
    weekList.push(`Week ${i}`)
  }
  return weekList
}