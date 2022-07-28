import { Button, Card, Grid, TextField } from '@mui/material'
import { useState } from 'react'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import PlayerStats from './PlayerStats'
import CenterStatCard from './CenterStatCard'
import { useEffect } from 'react'
import PlayerCard from './PlayerCard'

const DEFAULT_TEAM = {
  teamName: 'Team Name',
  score: 0,
  roundScore: 0,
  bagnumber: 1,
  bag1: '',
  bag2: '',
  bag3: '',
  bag4: '',
  totalPoints: 0,
  pprAvg: 0,
  fourBaggers: 0,
  bagsThrown: 0,
  slide: 0,
  airmail: 0,
  roll: 0,
  block: 0,
  push: 0,
  woody: 0,
  bully: 0,
  foul: 0
}

export default function GamePage() {
  const [teamOne, setTeamOne] = useState(DEFAULT_TEAM)
  const [teamTwo, setTeamTwo] = useState(DEFAULT_TEAM)
  const [teamOneHistory, setTeamOneHistory] = useState([])
  const [teamTwoHistory, setTeamTwoHistory] = useState([])
  const [roundNumber, setRoundNumber] = useState(0)
  const [bagDescription, setBagDescription] = useState()
  const [startingTeamOne, setStartingTeamOne] = useState(true)
  const [isGameOver, setIsGameOver] = useState(false)
  const [teamOneScore, setTeamOneScore] = useState(0)
  const [teamTwoScore, setTeamTwoScore] = useState(0)

  useEffect(() => {
    console.log(teamOneHistory)
    console.log(teamTwoHistory)
  }, [teamOneHistory, teamTwoHistory])

  useEffect(() => {
    if (roundNumber !== 0) {
      setTeamOne(s => ({
        ...s,
        pprAvg: teamOne.totalPoints / roundNumber
      }))
    }
  }, [teamOne.totalPoints, roundNumber])

  useEffect(() => {
    if (roundNumber !== 0) {
      setTeamTwo(s => ({
        ...s,
        pprAvg: teamTwo.totalPoints / roundNumber
      }))
    }
  }, [teamTwo.totalPoints, roundNumber])

  function AddPointsTeamOne(points) {
    if (teamOne.roundScore + points <= 12 && (teamOne.roundScore > 0 || points > 0)) {
      setTeamOne(s => ({ ...s, roundScore: points + teamOne.roundScore }))
    }
  }

  function AddPointsTeamTwo(points) {
    if (teamTwo.roundScore + points <= 12 && (teamTwo.roundScore > 0 || points > 0)) {
      setTeamTwo(s => ({ ...s, roundScore: points + teamTwo.roundScore }))
    }
  }

  function AddBagTeamOne(bagType) {
    if (teamOne.bagnumber < 5) {
      switch (bagType) {
        case 'Slide':
          setTeamOne(s => ({ ...s, slide: teamOne.slide + 1 }))
          break
        case 'Airmail':
          setTeamOne(s => ({ ...s, airmail: teamOne.airmail + 1 }))
          break
        case 'Roll':
          setTeamOne(s => ({ ...s, roll: teamOne.roll + 1 }))
          break
        case 'Block':
          setTeamOne(s => ({ ...s, block: teamOne.block + 1 }))
          break
        case 'Push':
          setTeamOne(s => ({ ...s, push: teamOne.push + 1 }))
          break
        case 'Woody':
          setTeamOne(s => ({ ...s, woody: teamOne.woody + 1 }))
          break
        case 'Bully':
          setTeamOne(s => ({ ...s, bully: teamOne.bully + 1 }))
          break
        case 'Foul':
          setTeamOne(s => ({ ...s, foul: teamOne.foul + 1 }))
          break
        default:
      }
    }
    if (teamOne.bagnumber === 1) {
      setTeamOne(s => ({ ...s, bag1: bagType }))
    }
    if (teamOne.bagnumber === 2) {
      setTeamOne(s => ({ ...s, bag2: bagType }))
    }
    if (teamOne.bagnumber === 3) {
      setTeamOne(s => ({ ...s, bag3: bagType }))
    }
    if (teamOne.bagnumber === 4) {
      setTeamOne(s => ({ ...s, bag4: bagType, bagnumber: '-', bagsThrown: teamOne.bagsThrown + 1 }))
    }
    if (teamOne.bagnumber < 4) {
      setTeamOne(s => ({ ...s, bagnumber: teamOne.bagnumber + 1, bagsThrown: teamOne.bagsThrown + 1 }))
    }
  }

  function AddBagTeamTwo(bagType) {
    if (teamTwo.bagnumber < 5) {
      switch (bagType) {
        case 'Slide':
          setTeamTwo(s => ({ ...s, slide: teamTwo.slide + 1 }))
          break
        case 'Airmail':
          setTeamTwo(s => ({ ...s, airmail: teamTwo.airmail + 1 }))
          break
        case 'Roll':
          setTeamTwo(s => ({ ...s, roll: teamTwo.roll + 1 }))
          break
        case 'Block':
          setTeamTwo(s => ({ ...s, block: teamTwo.block + 1 }))
          break
        case 'Push':
          setTeamTwo(s => ({ ...s, push: teamTwo.push + 1 }))
          break
        case 'Woody':
          setTeamTwo(s => ({ ...s, woody: teamTwo.woody + 1 }))
          break
        case 'Bully':
          setTeamTwo(s => ({ ...s, bully: teamTwo.bully + 1 }))
          break
        case 'Foul':
          setTeamTwo(s => ({ ...s, foul: teamTwo.foul + 1 }))
          break
        default:
      }
    }
    if (teamTwo.bagnumber === 1) {
      setTeamTwo(s => ({ ...s, bag1: bagType }))
    }
    if (teamTwo.bagnumber === 2) {
      setTeamTwo(s => ({ ...s, bag2: bagType }))
    }
    if (teamTwo.bagnumber === 3) {
      setTeamTwo(s => ({ ...s, bag3: bagType }))
    }
    if (teamTwo.bagnumber === 4) {
      setTeamTwo(s => ({ ...s, bag4: bagType, bagnumber: '-', bagsThrown: teamTwo.bagsThrown + 1 }))
    }
    if (teamTwo.bagnumber < 4) {
      setTeamTwo(s => ({ ...s, bagnumber: teamTwo.bagnumber + 1, bagsThrown: teamTwo.bagsThrown + 1 }))
    }
  }

  function ScoreRound() {
    teamOne.roundScore > teamTwo.roundScore
      ? setStartingTeamOne(true)
      : teamOne.roundScore < teamTwo.roundScore
      ? setStartingTeamOne(false)
      : setStartingTeamOne(startingTeamOne)
    let teamOneScore = teamOne.roundScore - teamTwo.roundScore < 0 ? 0 : teamOne.roundScore - teamTwo.roundScore

    let teamTwoScore = teamTwo.roundScore - teamOne.roundScore < 0 ? 0 : teamTwo.roundScore - teamOne.roundScore

    setTeamOne(s => ({
      ...s,
      score: teamOneScore + teamOne.score,
      totalPoints: teamOne.totalPoints + teamOne.roundScore,
      fourBaggers: teamOne.roundScore === 12 ? teamOne.fourBaggers + 1 : teamOne.fourBaggers
    }))

    setTeamTwo(s => ({
      ...s,
      score: teamTwoScore + teamTwo.score,
      totalPoints: teamTwo.totalPoints + teamTwo.roundScore,
      fourBaggers: teamTwo.roundScore === 12 ? teamTwo.fourBaggers + 1 : teamTwo.fourBaggers
    }))

    if (teamOneScore + teamOne.score >= 21 || teamTwoScore + teamTwo.score >= 21) {
      setIsGameOver(true)
    } else {
      setRoundNumber(roundNumber + 1)
      setTeamOne(s => ({ ...s, bagnumber: 1 }))
      setTeamTwo(s => ({ ...s, bagnumber: 1 }))
    }

    setTeamOneHistory([
      ...teamOneHistory,
      {
        round: roundNumber,
        ...teamOne,
        bags: [teamOne.bag1, teamOne.bag2, teamOne.bag3, teamOne.bag4]
      }
    ])
    setTeamTwoHistory([
      ...teamTwoHistory,
      {
        round: roundNumber,
        ...teamTwo,
        bags: [teamTwo.bag1, teamTwo.bag2, teamTwo.bag3, teamTwo.bag4]
      }
    ])
    ClearRound()
  }

  function ClearRound() {
    setTeamOne(s => ({ ...s, roundScore: 0 }))
    setTeamTwo(s => ({ ...s, roundScore: 0 }))
  }

  function ResetGame() {
    setTeamOne(s => ({ ...s, bagnumber: 1, score: 0, roundScore: 0 }))
    setTeamTwo(s => ({ ...s, bagnumber: 1, score: 0, roundScore: 0 }))
    setTeamOneHistory([])
    setTeamTwoHistory([])
    setIsGameOver(false)
  }
  return (
    <>
      <Grid container>
        <Grid>
          <PlayerCard
            isGameOver={isGameOver}
            setBagDescription={setBagDescription}
            opponentsScore={teamTwoScore}
            setScore={setTeamOneScore}
            roundNumber={roundNumber}
          />
        </Grid>
        {/* Team One Card */}
        <Grid>
          <Card
            style={{ margin: '10px', padding: '10px', alignItems: 'end', textAlign: 'center', width: '255x', height: '450px' }}>
            <TextField
              size='small'
              value={teamOne.teamName}
              onChange={e => setTeamOne(f => ({ ...f, teamName: e.target.value }))}
            />
            <h1>{teamOne.score}</h1>
            <h2>{teamOne.roundScore}</h2>
            {isGameOver ? (
              teamOne.score > 21 ? (
                <div>{teamOne.teamName} Wins</div>
              ) : (
                <></>
              )
            ) : (
              <>
                <h4>
                  <Button variant='outlined' onClick={() => AddPointsTeamOne(3)} disabled={isGameOver}>
                    +3
                  </Button>
                  <Button variant='outlined' onClick={() => AddPointsTeamOne(2)} disabled={isGameOver}>
                    +2
                  </Button>
                  <Button variant='outlined' onClick={() => AddPointsTeamOne(1)} disabled={isGameOver}>
                    +1
                  </Button>
                  <Button variant='outlined' onClick={() => AddPointsTeamOne(-1)} disabled={isGameOver}>
                    -1
                  </Button>
                </h4>
                <h2>Shot {teamOne.bagnumber}</h2>
                <div>
                  <Button
                    onClick={() => AddBagTeamOne('Slide')}
                    style={{ width: '75px', margin: '10px 10px 0px 0px' }}
                    color='success'
                    variant='outlined'
                    onMouseOver={() => setBagDescription('A bag that lands in front of the hole and slides in')}
                    onMouseLeave={() => setBagDescription('')}>
                    Slide
                  </Button>
                  <Button
                    onClick={() => AddBagTeamOne('Airmail')}
                    style={{ width: '75px', margin: '10px 10px 0px 0px' }}
                    color='success'
                    variant='outlined'
                    onMouseOver={() =>
                      setBagDescription(
                        'A bag that does not slide or bounce on the board but goes directly into the hole, usually over an opponents blocker bag'
                      )
                    }
                    onMouseLeave={() => setBagDescription('')}>
                    Airmail
                  </Button>
                  <Button
                    onClick={() => AddBagTeamOne('Roll')}
                    style={{ width: '75px', margin: '10px 0px 0px 0px' }}
                    color='success'
                    variant='outlined'
                    onMouseOver={() => setBagDescription('A bag that goes over the top of a blocker and into the hole')}
                    onMouseLeave={() => setBagDescription('')}>
                    Roll
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={() => AddBagTeamOne('Block')}
                    style={{ width: '75px', margin: '10px 10px 0px 0px' }}
                    variant='outlined'
                    onMouseOver={() =>
                      setBagDescription('A bag that lands in front of the hole, blocking the hole from an opponents slide shot')
                    }
                    onMouseLeave={() => setBagDescription('')}>
                    Block
                  </Button>
                  <Button
                    onClick={() => AddBagTeamOne('Push')}
                    style={{ width: '75px', margin: '10px 10px 0px 0px' }}
                    variant='outlined'
                    onMouseOver={() => setBagDescription('A bag that slides up the board and pushes a blocker in the hole')}
                    onMouseLeave={() => setBagDescription('')}>
                    Push
                  </Button>
                  <Button
                    onClick={() => AddBagTeamOne('Woody')}
                    style={{ width: '75px', margin: '10px 0px 0px 0px' }}
                    variant='outlined'
                    onMouseOver={() => setBagDescription('A bag that lands on the board but does not block the hole')}
                    onMouseLeave={() => setBagDescription('')}>
                    Woody
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={() => AddBagTeamOne('Foul')}
                    style={{ width: '75px', margin: '10px 10px 0px 0px' }}
                    color='error'
                    variant='outlined'
                    onMouseOver={() => setBagDescription('A bag that is on, hit, or touching the ground')}
                    onMouseLeave={() => setBagDescription('')}>
                    Foul
                  </Button>
                  <Button
                    onClick={() => AddBagTeamOne('Bully')}
                    style={{ width: '75px', margin: '10px 0px 0px 0px' }}
                    color='error'
                    variant='outlined'
                    onMouseOver={() =>
                      setBagDescription('A bag that pushes or “bullies” your opponents bag out of the danger zone')
                    }
                    onMouseLeave={() => setBagDescription('')}>
                    Bully
                  </Button>
                </div>
              </>
            )}
          </Card>
          <PlayerStats player={teamOne} />
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
          </Card>
          <CenterStatCard />
        </Grid>

        {/* Team Two card */}
        <Grid>
          <Card style={{ margin: '10px', padding: '10px', textAlign: 'center', width: '255x', height: '450px' }}>
            <TextField
              size='small'
              value={teamTwo.teamName}
              onChange={e => setTeamTwo(f => ({ ...f, teamName: e.target.value }))}
            />
            <h1>{teamTwo.score}</h1>
            <h2>{teamTwo.roundScore}</h2>
            {isGameOver ? (
              teamTwo.score > 21 ? (
                <div>{teamTwo.teamName} Wins</div>
              ) : (
                <></>
              )
            ) : (
              <>
                <h4>
                  <Button variant='outlined' onClick={() => AddPointsTeamTwo(3)} disabled={isGameOver}>
                    +3
                  </Button>
                  <Button variant='outlined' onClick={() => AddPointsTeamTwo(2)} disabled={isGameOver}>
                    +2
                  </Button>
                  <Button variant='outlined' onClick={() => AddPointsTeamTwo(1)} disabled={isGameOver}>
                    +1
                  </Button>
                  <Button variant='outlined' onClick={() => AddPointsTeamTwo(-1)} disabled={isGameOver}>
                    -1
                  </Button>
                </h4>
                <h2>Shot {teamTwo.bagnumber}</h2>
                <div>
                  <Button
                    onClick={() => AddBagTeamTwo('Slide')}
                    style={{ width: '75px', margin: '10px 10px 0px 0px' }}
                    color='success'
                    variant='outlined'
                    onMouseOver={() => setBagDescription('A bag that lands in front of the hole and slides in')}
                    onMouseLeave={() => setBagDescription('')}>
                    Slide
                  </Button>
                  <Button
                    onClick={() => AddBagTeamTwo('Airmail')}
                    style={{ width: '75px', margin: '10px 10px 0px 0px' }}
                    color='success'
                    variant='outlined'
                    onMouseOver={() =>
                      setBagDescription(
                        'A bag that does not slide or bounce on the board but goes directly into the hole, usually over an opponents blocker bag'
                      )
                    }
                    onMouseLeave={() => setBagDescription('')}>
                    Airmail
                  </Button>
                  <Button
                    onClick={() => AddBagTeamTwo('Roll')}
                    style={{ width: '75px', margin: '10px 0px 0px 0px' }}
                    color='success'
                    variant='outlined'
                    onMouseOver={() => setBagDescription('A bag that goes over the top of a blocker and into the hole')}
                    onMouseLeave={() => setBagDescription('')}>
                    Roll
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={() => AddBagTeamTwo('Block')}
                    style={{ width: '75px', margin: '10px 10px 0px 0px' }}
                    variant='outlined'
                    onMouseOver={() =>
                      setBagDescription('A bag that lands in front of the hole, blocking the hole from an opponents slide shot')
                    }
                    onMouseLeave={() => setBagDescription('')}>
                    Block
                  </Button>
                  <Button
                    onClick={() => AddBagTeamTwo('Push')}
                    style={{ width: '75px', margin: '10px 10px 0px 0px' }}
                    variant='outlined'
                    onMouseOver={() => setBagDescription('A bag that slides up the board and pushes a blocker in the hole')}
                    onMouseLeave={() => setBagDescription('')}>
                    Push
                  </Button>
                  <Button
                    onClick={() => AddBagTeamTwo('Woody')}
                    style={{ width: '75px', margin: '10px 0px 0px 0px' }}
                    variant='outlined'
                    onMouseOver={() => setBagDescription('A bag that lands on the board but does not block the hole')}
                    onMouseLeave={() => setBagDescription('')}>
                    Woody
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={() => AddBagTeamTwo('Foul')}
                    style={{ width: '75px', margin: '10px 10px 0px 0px' }}
                    color='error'
                    variant='outlined'
                    onMouseOver={() => setBagDescription('A bag that is on, hit, or touching the ground')}
                    onMouseLeave={() => setBagDescription('')}>
                    Foul
                  </Button>
                  <Button
                    onClick={() => AddBagTeamTwo('Bully')}
                    style={{ width: '75px', margin: '10px 0px 0px 0px' }}
                    color='error'
                    variant='outlined'
                    onMouseOver={() =>
                      setBagDescription('A bag that pushes or “bullies” your opponents bag out of the danger zone')
                    }
                    onMouseLeave={() => setBagDescription('')}>
                    Bully
                  </Button>
                </div>
              </>
            )}
          </Card>
          <PlayerStats player={teamTwo} />
        </Grid>
      </Grid>
    </>
  )
}
