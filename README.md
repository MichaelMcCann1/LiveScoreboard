# LiveScoreboard

**Live Link to Project:** https://mm-livescores.web.app/

LiveScoreboard shows live scores from various sport leagues. This web app was created using ReactJS and Styled Components. The data comes from ESPN's REST API. More info on this API can be found [here](https://gist.github.com/akeaswaran/b48b02f1c94f873c6655e7129910fc3b).

<img src="https://github.com/MichaelMcCann1/LiveScoreboard/blob/main/liveScoreboardScreenshot.png" height="300px">


## Code Explanation
### Getting the Data
All the data for this app is obtained by using the ESPN REST API (info about the API is linked above). The API provides tons of data for each game and team so more information about each game could easily be added in the future. Each league has a slightly different layout for the returned data so you have to change the code slightly for each league. The method described below is essentially how all the data is obtained and displayed for each league. 

The `UseEffect` hook is used to get the data on the initial page render. The API is called by using the Axios library. The API call returns an array that contains information on every single game for a particular day(baseball, basketball hockey) or week(football). This returned array is saved and it is looped through to obtain the desired information for each game. The result is an array where each element is an object that contains the desired information for each game. Pseudocode for obtaining the data is shown below.

```javascript
useEffect(() => {
  axios.get('API URL HERE')
    .then(res => {
      let savedData = []
      for (i=0; i<res.data; i++){
        savedData.push({
          desiredData1 = res.data[i].property1
          desiredData2 = res.data[i].property2
          desiredData3 = res.data[i].property3
          desiredData4 = res.data[i].property4
          .
          .
          .
        })
      }
    }
}, [])
```

### Displaying the Data
The data is displayed in what I call a "ScoreBox". A ScoreBox is a React component and all the data for each game is passed to the component as a prop. The ScoreBoxes are generated dynamically by using the `map()` array method. For each element in the `savedData` array shown earlier the code creates a ScoreBox component and passes the data as props. Pseudocode is shown below.

```javascript
return(
  {savedData.map((game, index) => (
    <ScoreBox data={savedData[index]} />
    )
  }
)
```
