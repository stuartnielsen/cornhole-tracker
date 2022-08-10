import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import { Button, Card, Grid } from '@mui/material'
import { useState } from 'react'
import CenterStatCard from './CenterStatCard'
import PlayerCard from './PlayerCard'
import { CSVLink } from 'react-csv'
import { useEffect } from 'react'

export default function GamePage({ isFourPlayer, players, history, setStartGame }) {
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
  const [playerOne, setPlayerOne] = useState(history[history.findIndex(item => item.teamName === players[0])])
  const [playerTwo, setPlayerTwo] = useState(history[history.findIndex(item => item.teamName === players[1])])
  const [playerThree, setPlayerThree] = useState(history[history.findIndex(item => item.teamName === players[2])])
  const [playerFour, setPlayerFour] = useState(history[history.findIndex(item => item.teamName === players[3])])
  const updatedHistory = history

  useEffect(() => {
    UpdateHistory()
  }, [isGameOver, UpdateHistory])

  function ScoreRound() {
    setRounds()
    setFourBaggers()

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
    }
    setRounds()
    UpdateHistory()
    ClearRound()
  }

  function setFourBaggers() {
    if (teamOneRoundScore === 12) setPlayerOne(s => ({ ...s, fourBaggers: playerOne.fourBaggers + 1 }))

    if (teamTwoRoundScore === 12) setPlayerTwo(s => ({ ...s, fourBaggers: playerTwo.fourBaggers + 1 }))
    if (isFourPlayer) {
      setPlayerThree(s => ({ ...s, fourBaggers: playerThree.fourBaggers + 1 }))
      setPlayerFour(s => ({ ...s, fourBaggers: playerFour.fourBaggers + 1 }))
    }
  }

  function UpdateHistory() {
    updatedHistory[history.findIndex(item => item.teamName === playerOne.teamName)] = playerOne
    updatedHistory[history.findIndex(item => item.teamName === playerTwo.teamName)] = playerTwo
    if (isFourPlayer) {
      updatedHistory[history.findIndex(item => item.teamName === playerThree.teamName)] = playerThree
      updatedHistory[history.findIndex(item => item.teamName === playerFour.teamName)] = playerFour
    }
  }

  function setRounds() {
    if (isFourPlayer) {
      !activeSide ? setTotalRounds(totalRounds + 1) : setSideTwoRounds(sideTwoRounds + 1)
      setActiveSide(!activeSide)
    } else {
      setTotalRounds(totalRounds + 1)
    }
    setRoundNumber(roundNumber + 1)

    setPlayerOne(s => ({ ...s, totalRounds: playerOne.totalRounds + 1 }))
    setPlayerTwo(s => ({ ...s, totalRounds: playerTwo.totalRounds + 1 }))
    if (isFourPlayer) {
      setPlayerThree(s => ({ ...s, totalRounds: playerThree.totalRounds + 1 }))
      setPlayerFour(s => ({ ...s, totalRounds: playerFour.totalRounds + 1 }))
    }
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
              players={players[2]}
              history={history}
              player={playerThree}
              setPlayer={setPlayerThree}
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
            players={players[0]}
            history={history}
            player={playerOne}
            setPlayer={setPlayerOne}
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
            <h4 style={{ marginBottom: '0px' }}>Shot Description</h4>
            <div>{bagDescription}</div>
            <Button variant='outlined' size='small' color='error' style={{ marginTop: '10px' }} onClick={() => ResetGame()}>
              New Game
            </Button>
            {isGameOver || roundNumber !== 1 ? (
              <>
                <div style={{ marginTop: '10px' }}>
                  <CSVLink
                    className='MuiButton-root MuiButton-outlined MuiButton-outlinedSuccess MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButtonBase-root  css-sxix9q-MuiButtonBase-root-MuiButton-root'
                    data={updatedHistory}
                    filename={'CornholePlayerStats'}>
                    Save Stats
                  </CSVLink>
                </div>
                <div>
                  <Button variant='outlined' onClick={() => setStartGame(false)} style={{ marginTop: '10px' }}>
                    Change Players
                  </Button>
                </div>
              </>
            ) : (
              <></>
            )}
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
            players={players[1]}
            history={history}
            player={playerTwo}
            setPlayer={setPlayerTwo}
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
              players={players[3]}
              history={history}
              player={playerFour}
              setPlayer={setPlayerFour}
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
Bug: total rounds exported are short one round
Bug: Four baggers exported are short one if it was done on a winning round
Bug: PPR are one round behind as the game ends so the eport value is incorrect
Feature: Style buttons on game page
Feature: Reset game
Feature: avg. rounds per game
Feature: Games Played/won tracker
Feature: Single Player
*/
