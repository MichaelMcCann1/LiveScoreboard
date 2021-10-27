export const formatSelectedData = function(selectedGameData){
  if (selectedGameData.status === 'Final') {
    selectedGameData.date = 'Final'
    selectedGameData.time = ''
  } else if (selectedGameData.status === 'In Progress') {
    selectedGameData.date = selectedGameData.clock
    selectedGameData.time = selectedGameData.period
  }

  if (selectedGameData.status === 'Final') selectedGameData.tv = ''

  if (selectedGameData.status === 'Scheduled') {
    selectedGameData.overUnder ? selectedGameData.awayScore = `T:${selectedGameData.overUnder}` : selectedGameData.awayScore = ''
    selectedGameData.homeScore = selectedGameData.spread
  }

  switch (selectedGameData.period) {
    case 1:
      selectedGameData.period = '1st'
      break
    case 2: 
      selectedGameData.period = '2nd'
      break
    case 3: 
      selectedGameData.period = '3rd'
      break
    case 4: 
      selectedGameData.period = '4th'
      break
    default:
      selectedGameData.period = "OT"
  }

  if (selectedGameData.leauge === 'NFL' && selectedGameData.awayName === "undefined") selectedGameData.awayName = "Football Team"
  if (selectedGameData.leauge === 'NFL' && selectedGameData.homeName === "undefined") selectedGameData.homeName = "Football Team"

  selectedGameData.awayColor = 'rgb(240, 240, 240)'
  selectedGameData.homeColor = 'rgb(250, 250, 250)'
}