import { NFLids, CFBids, NBAids } from '../teamIDs'

export const getTeamID = function(league, teamAbbreviation){
  let teamID
  if (league === 'NFL') teamID = NFLids[teamAbbreviation]
  else if (league === 'NCAAF' || league === 'college-football') teamID = CFBids[teamAbbreviation]
  else if (league === 'NBA') teamID = NBAids[teamAbbreviation]

  return teamID
}