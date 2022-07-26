import { Button, Card, Grid, TextField, Tooltip } from '@mui/material'
import { useState } from 'react'
import './App.css'

const DEFAULT_TEAM = {
  teamName: 'Team Name',
  score: 0,
  roundScore: 0,
  bagnumber: 1,
  bag1: '',
  bag2: '',
  bag3: '',
  bag4: ''
}

export default function App() {
  const [teamOne, setTeamOne] = useState(DEFAULT_TEAM)
  const [teamTwo, setTeamTwo] = useState(DEFAULT_TEAM)
  const [teamOneHistory, setTeamOneHistory] = useState([])
  const [teamTwoHistory, setTeamTwoHistory] = useState([])
  const [roundNumber, setRoundNumber] = useState(1)

  function AddPointsTeamOne(points) {
    if (teamOne.roundScore + points <= 12) {
      setTeamOne(s => ({ ...s, roundScore: points + teamOne.roundScore }))
    }
  }
  function AddPointsTeamTwo(points) {
    if (teamTwo.roundScore + points <= 12) {
      setTeamTwo(s => ({ ...s, roundScore: points + teamTwo.roundScore }))
    }
  }
  function AddBagTeamOne(bagType) {
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
      setTeamOne(s => ({ ...s, bag4: bagType }))
    }
    setTeamOne(s => ({ ...s, bagnumber: teamOne.bagnumber + 1 }))
  }
  function AddBagTeamTwo(bagType) {
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
      setTeamTwo(s => ({ ...s, bag4: bagType }))
    }
    setTeamTwo(s => ({ ...s, bagnumber: teamTwo.bagnumber + 1 }))
  }
  function ScoreRound() {
    let teamOneScore = teamOne.roundScore - teamTwo.roundScore < 0 ? 0 : teamOne.roundScore - teamTwo.roundScore

    let teamTwoScore = teamTwo.roundScore - teamOne.roundScore < 0 ? 0 : teamTwo.roundScore - teamOne.roundScore

    setTeamOne(s => ({ ...s, score: teamOneScore + teamOne.score }))
    setTeamOne(s => ({ ...s, roundScore: 0 }))

    setTeamTwo(s => ({ ...s, score: teamTwoScore + teamTwo.score }))
    setTeamTwo(s => ({ ...s, roundScore: 0 }))

    setRoundNumber(roundNumber + 1)

    setTeamOneHistory([
      ...teamOneHistory,
      {
        round: roundNumber,
        points: teamOne.roundScore,
        score: teamOne.score,
        bags: [teamOne.bag1, teamOne.bag2, teamOne.bag3, teamOne.bag4]
      }
    ])
    setTeamTwoHistory([
      ...teamTwoHistory,
      {
        round: roundNumber,
        points: teamTwo.roundScore,
        score: teamTwo.score,
        bags: [teamTwo.bag1, teamTwo.bag2, teamTwo.bag3, teamTwo.bag4]
      }
    ])
    console.log(teamOneHistory)
    console.log(teamTwoHistory)
    setTeamOne(s => ({ ...s, bagnumber: 1 }))
    setTeamTwo(s => ({ ...s, bagnumber: 1 }))
  }
  return (
    <>
      <Grid container>
        {/* Team One Card */}
        <Grid>
          <Card style={{ margin: '10px', padding: '10px', alignItems: 'end', textAlign: 'center' }}>
            <TextField
              size='small'
              value={teamOne.teamName}
              onChange={e => setTeamOne(f => ({ ...f, teamName: e.target.value }))}
            />
            <h1>{teamOne.score}</h1>
            <h2>{teamOne.roundScore}</h2>
            <h4>
              <Button variant='outlined' onClick={() => AddPointsTeamOne(3)}>
                +3
              </Button>
              <Button variant='outlined' onClick={() => AddPointsTeamOne(2)}>
                +2
              </Button>
              <Button variant='outlined' onClick={() => AddPointsTeamOne(1)}>
                +1
              </Button>
              <Button variant='outlined' onClick={() => AddPointsTeamOne(-1)}>
                -1
              </Button>
            </h4>
            <h2>Shot {teamOne.bagnumber}</h2>
            <div>
              <Tooltip placement='top' title='A bag that lands in front of the hole and slides in'>
                <Button
                  onClick={() => AddBagTeamOne('Slide')}
                  style={{ width: '75px', margin: '10px 10px 0px 0px' }}
                  color='success'
                  variant='outlined'>
                  Slide
                </Button>
              </Tooltip>
              <Tooltip
                placement='top'
                title='A bag that does not slide or bounce on the board but goes directly into the hole, usually over an opponents blocker bag'>
                <Button
                  onClick={() => AddBagTeamOne('Airmail')}
                  style={{ width: '75px', margin: '10px 10px 0px 0px' }}
                  color='success'
                  variant='outlined'>
                  Airmail
                </Button>
              </Tooltip>
              <Tooltip placement='top' title='A bag that goes over the top of a blocker and into the hole'>
                <Button
                  onClick={() => AddBagTeamOne('Roll')}
                  style={{ width: '75px', margin: '10px 0px 0px 0px' }}
                  color='success'
                  variant='outlined'>
                  Roll
                </Button>
              </Tooltip>
            </div>
            <div>
              <Tooltip
                placement='left'
                title='A bag that lands in front of the hole, blocking the hole from an opponents slide shot'>
                <Button
                  onClick={() => AddBagTeamOne('Block')}
                  style={{ width: '75px', margin: '10px 10px 0px 0px' }}
                  variant='outlined'>
                  Block
                </Button>
              </Tooltip>
              <Tooltip title='A bag that slides up the board and pushes a blocker in the hole'>
                <Button
                  onClick={() => AddBagTeamOne('Push')}
                  style={{ width: '75px', margin: '10px 10px 0px 0px' }}
                  variant='outlined'>
                  Push
                </Button>
              </Tooltip>
              <Tooltip title='A bag that lands on the board but does not block the hole'>
                <Button
                  onClick={() => AddBagTeamOne('Woody')}
                  style={{ width: '75px', margin: '10px 0px 0px 0px' }}
                  variant='outlined'>
                  Woody
                </Button>
              </Tooltip>
            </div>
            <div>
              <Tooltip title='A bag that is on, hit, or touching the ground'>
                <Button
                  onClick={() => AddBagTeamOne('Foul')}
                  style={{ width: '75px', margin: '10px 10px 0px 0px' }}
                  color='error'
                  variant='outlined'>
                  Foul
                </Button>
              </Tooltip>
              <Tooltip title='A bag that pushes or “bullies” your opponents bag out of the danger zone'>
                <Button
                  onClick={() => AddBagTeamOne('Bully')}
                  style={{ width: '75px', margin: '10px 0px 0px 0px' }}
                  color='error'
                  variant='outlined'>
                  Bully
                </Button>
              </Tooltip>
            </div>
          </Card>
        </Grid>

        {/* CenterCard */}
        <Grid>
          <Card style={{ margin: '10px', padding: '30px 10px', textAlign: 'center' }}>
            Round {roundNumber}
            <h1>Score</h1>
            <h2>Round Score</h2>
            <h4>
              <Button onClick={ScoreRound}>Submit Round</Button>
            </h4>
          </Card>
        </Grid>

        {/* Team Two card */}
        <Grid>
          <Card style={{ margin: '10px', padding: '10px', textAlign: 'center' }}>
            <TextField
              size='small'
              value={teamTwo.teamName}
              onChange={e => setTeamTwo(f => ({ ...f, teamName: e.target.value }))}
            />
            <h1>{teamTwo.score}</h1>
            <h2>{teamTwo.roundScore}</h2>
            <h4>
              <Button variant='outlined' onClick={() => AddPointsTeamTwo(3)}>
                +3
              </Button>
              <Button variant='outlined' onClick={() => AddPointsTeamTwo(2)}>
                +2
              </Button>
              <Button variant='outlined' onClick={() => AddPointsTeamTwo(1)}>
                +1
              </Button>
              <Button variant='outlined' onClick={() => AddPointsTeamTwo(-1)}>
                -1
              </Button>
            </h4>
            <h2>Shot {teamTwo.bagnumber}</h2>
            <div>
              <Tooltip placement='top' title='A bag that lands in front of the hole and slides in'>
                <Button
                  onClick={() => AddBagTeamTwo('Slide')}
                  style={{ width: '75px', margin: '10px 10px 0px 0px' }}
                  color='success'
                  variant='outlined'>
                  Slide
                </Button>
              </Tooltip>
              <Tooltip
                placement='top'
                title='A bag that does not slide or bounce on the board but goes directly into the hole, usually over an opponents blocker bag'>
                <Button
                  onClick={() => AddBagTeamTwo('Airmail')}
                  style={{ width: '75px', margin: '10px 10px 0px 0px' }}
                  color='success'
                  variant='outlined'>
                  Airmail
                </Button>
              </Tooltip>
              <Tooltip placement='top' title='A bag that goes over the top of a blocker and into the hole'>
                <Button
                  onClick={() => AddBagTeamTwo('Roll')}
                  style={{ width: '75px', margin: '10px 0px 0px 0px' }}
                  color='success'
                  variant='outlined'>
                  Roll
                </Button>
              </Tooltip>
            </div>
            <div>
              <Tooltip
                placement='left'
                title='A bag that lands in front of the hole, blocking the hole from an opponents slide shot'>
                <Button
                  onClick={() => AddBagTeamTwo('Block')}
                  style={{ width: '75px', margin: '10px 10px 0px 0px' }}
                  variant='outlined'>
                  Block
                </Button>
              </Tooltip>
              <Tooltip title='A bag that slides up the board and pushes a blocker in the hole'>
                <Button
                  onClick={() => AddBagTeamTwo('Push')}
                  style={{ width: '75px', margin: '10px 10px 0px 0px' }}
                  variant='outlined'>
                  Push
                </Button>
              </Tooltip>
              <Tooltip title='A bag that lands on the board but does not block the hole'>
                <Button
                  onClick={() => AddBagTeamTwo('Woody')}
                  style={{ width: '75px', margin: '10px 0px 0px 0px' }}
                  variant='outlined'>
                  Woody
                </Button>
              </Tooltip>
            </div>
            <div>
              <Tooltip title='A bag that is on, hit, or touching the ground'>
                <Button
                  onClick={() => AddBagTeamTwo('Foul')}
                  style={{ width: '75px', margin: '10px 10px 0px 0px' }}
                  color='error'
                  variant='outlined'>
                  Foul
                </Button>
              </Tooltip>
              <Tooltip title='A bag that pushes or “bullies” your opponents bag out of the danger zone'>
                <Button
                  onClick={() => AddBagTeamTwo('Bully')}
                  style={{ width: '75px', margin: '10px 0px 0px 0px' }}
                  color='error'
                  variant='outlined'>
                  Bully
                </Button>
              </Tooltip>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
