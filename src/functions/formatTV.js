export const formatTV = function(selectedGameData, rawGameData){
  try{
    selectedGameData.tv = rawGameData.broadcasts[0].names[0]
  } catch {
    selectedGameData.tv = ''
  }
}