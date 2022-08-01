import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import { Button, Card, Grid } from '@mui/material'
import { useState } from 'react'
import CenterStatCard from './CenterStatCard'
import PlayerCard from './PlayerCard'

export default function GamePage({ isFourPlayer, players }) {
  const [roundNumber, setRoundNumber] = useState(0)
  const [totalRounds, setTotalRounds] = useState(0)
  const [sideTwoRounds, setSideTwoRounds] = useState(0)
  const [bagDescription, setBagDescription] = useState()
  const [startingTeamOne, setStartingTeamOne] = useState(true)
  const [isGameOver, setIsGameOver] = useState(false)
  const [teamOneRoundScore, setTeamOneRoundScore] = useState(0)
  const [teamTwoRoundScore, setTeamTwoRoundScore] = useState(0)
  const [teamTwoGamePoints, setTeamTwoGamePoints] = useState(0)
  const [teamOneGamePoints, setTeamOneGamePoints] = useState(0)
  const [teamOneFourBaggers, setTeamOneFourBaggers] = useState(0)
  const [teamTwoFourBaggers, setTeamTwoFourBaggers] = useState(0)
  const [teamOneBagNumber, setTeamOneBagNumber] = useState(1)
  const [teamTwoBagNumber, setTeamTwoBagNumber] = useState(1)
  const [activeSide, setActiveSide] = useState(false)

  function ScoreRound() {
    if (teamOneRoundScore === 12) {
      setTeamOneFourBaggers(teamOneFourBaggers + 1)
    }
    if (teamTwoRoundScore === 12) {
      setTeamTwoFourBaggers(teamTwoFourBaggers + 1)
    }

    let teamOnesScore = teamOneRoundScore - teamTwoRoundScore < 0 ? 0 : teamOneRoundScore - teamTwoRoundScore
    let teamTwosScore = teamTwoRoundScore - teamOneRoundScore < 0 ? 0 : teamTwoRoundScore - teamOneRoundScore

    setTeamOneGamePoints(teamOnesScore + teamOneGamePoints)
    setTeamTwoGamePoints(teamTwosScore + teamTwoGamePoints)

    teamOneRoundScore > teamTwoRoundScore
      ? setStartingTeamOne(true)
      : teamOneRoundScore < teamTwoRoundScore
      ? setStartingTeamOne(false)
      : setStartingTeamOne(startingTeamOne)

    if (teamOneGamePoints + teamOnesScore >= 21 || teamTwoGamePoints + teamTwosScore >= 21) {
      setIsGameOver(true)
    } else {
      setRounds()
    }
    ClearRound()
  }
  function setRounds() {
    if (isFourPlayer) {
      !activeSide ? setTotalRounds(totalRounds + 1) : setSideTwoRounds(sideTwoRounds + 1)
      setActiveSide(!activeSide)
    } else {
      setTotalRounds(totalRounds + 1)
    }
    setRoundNumber(roundNumber + 1)
  }

  function ClearRound() {
    setTeamOneRoundScore(0)
    setTeamTwoRoundScore(0)
    setTeamOneBagNumber(1)
    setTeamTwoBagNumber(1)
  }

  function ResetGame() {
    ClearRound()
    setTeamOneGamePoints(0)
    setTeamTwoGamePoints(0)
    setIsGameOver(false)
    setRoundNumber(0)
  }
  return (
    <>
      <Grid container>
        {/* Team One Card */}

        <Grid>
          {isFourPlayer ? (
            <PlayerCard
              isGameOver={isGameOver}
              setBagDescription={setBagDescription}
              fourBaggers={teamOneFourBaggers}
              setScore={setTeamOneRoundScore}
              roundNumber={roundNumber}
              gamePoints={teamOneGamePoints}
              roundPoints={teamOneRoundScore}
              bagNumber={teamOneBagNumber}
              setBagNumber={setTeamOneBagNumber}
              totalRounds={sideTwoRounds}
              activePlayer={!activeSide}
              players={players}
            />
          ) : (
            <></>
          )}
        </Grid>
        <Grid>
          <PlayerCard
            isGameOver={isGameOver}
            setBagDescription={setBagDescription}
            fourBaggers={teamOneFourBaggers}
            setScore={setTeamOneRoundScore}
            roundNumber={roundNumber}
            gamePoints={teamOneGamePoints}
            roundPoints={teamOneRoundScore}
            bagNumber={teamOneBagNumber}
            setBagNumber={setTeamOneBagNumber}
            totalRounds={totalRounds}
            activePlayer={activeSide}
            players={players}
          />
        </Grid>

        {/* CenterCard */}
        <Grid>
          <Card style={{ margin: '10px', padding: '10px 10px', textAlign: 'center', width: '200px', height: '450px' }}>
            <ArrowCircleLeftIcon fontSize='large' style={{ marginRight: '20px', color: startingTeamOne ? 'green' : 'white' }} />
            Round {roundNumber + 1}
            <ArrowCircleRightIcon fontSize='large' style={{ marginLeft: '20px', color: startingTeamOne ? 'white' : 'green' }} />
            <h1>Score</h1>
            <h2>Round Score</h2>
            <h4>
              <Button variant='outlined' onClick={ScoreRound} disabled={isGameOver}>
                Submit Round
              </Button>
            </h4>
            <h4>Shot Description</h4>
            <div>{bagDescription}</div>
            <Button variant='outlined' size='small' color='error' style={{ marginTop: '20px' }} onClick={() => ResetGame()}>
              New Game
            </Button>
            {/* <div>
              <label>Four Player</label>
              <Switch onChange={() => setIsFourPlayer(!isFourPlayer)} />
            </div> */}
          </Card>
          <CenterStatCard />
        </Grid>

        {/* Team Two card */}
        <Grid>
          <PlayerCard
            isGameOver={isGameOver}
            setBagDescription={setBagDescription}
            fourBaggers={teamTwoFourBaggers}
            setScore={setTeamTwoRoundScore}
            roundNumber={roundNumber}
            gamePoints={teamTwoGamePoints}
            roundPoints={teamTwoRoundScore}
            bagNumber={teamTwoBagNumber}
            setBagNumber={setTeamTwoBagNumber}
            totalRounds={totalRounds}
            activePlayer={activeSide}
            players={players}
          />
        </Grid>

        <Grid>
          {isFourPlayer ? (
            <PlayerCard
              isGameOver={isGameOver}
              setBagDescription={setBagDescription}
              fourBaggers={teamTwoFourBaggers}
              setScore={setTeamTwoRoundScore}
              roundNumber={roundNumber}
              gamePoints={teamTwoGamePoints}
              roundPoints={teamTwoRoundScore}
              bagNumber={teamTwoBagNumber}
              setBagNumber={setTeamTwoBagNumber}
              totalRounds={sideTwoRounds}
              activePlayer={!activeSide}
              players={players}
            />
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </>
  )
}
/*TODO: 
Export Stats
avg. rounds per game
4 player game
  shared:
    4 baggers
    rounds
Games Played/won tracker
*/
