export const getSport = function(league){
  let sport
  if (league === 'NFL' || league === 'NCAAF') sport = 'football'
  if (league === 'NBA') sport = 'basketball'

  return sport
}