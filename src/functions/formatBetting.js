export const formatBetting = function(temp, gameArray){
  try{
    temp.spread = gameArray.odds[0].details
    if (temp.awayAbbreviation === temp.spread.substring(0,3).replace(/\s/g, "")) {
      temp.spread = temp.spread.substring(temp.spread.length-5)
      temp.spread = temp.spread.replace('-','+')
    }
    else {
      temp.spread = temp.spread.substring(temp.spread.length-5)
    }
    temp.overUnder = gameArray.odds[0].overUnder
  } catch {
    temp.spread = ''
    temp.overUnder = ''
  }
}