import { Button, Card, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useState } from 'react'

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

export default function PlayerCard({ isGameOver, setBagDescription, OpponentsScore, setScore, roundNumber }) {
  const [player, setPlayer] = useState(DEFAULT_TEAM)
  const [history, setHistory] = useState([])

  useEffect(() => {
    if (roundNumber !== 0) {
      setPlayer(s => ({
        ...s,
        pprAvg: player.totalPoints / roundNumber
      }))
    }
  }, [player.totalPoints, roundNumber])

  function AddPlayerPoints(points) {
    if (player.roundScore + points <= 12 && (player.roundScore > 0 || points > 0)) {
      setPlayer(s => ({ ...s, roundScore: points + player.roundScore }))
      setScore(player.roundScore)
    }
  }

  function AddBagTeamOne(bagType) {
    if (player.bagnumber < 5) {
      switch (bagType) {
        case 'Slide':
          setPlayer(s => ({ ...s, slide: player.slide + 1 }))
          break
        case 'Airmail':
          setPlayer(s => ({ ...s, airmail: player.airmail + 1 }))
          break
        case 'Roll':
          setPlayer(s => ({ ...s, roll: player.roll + 1 }))
          break
        case 'Block':
          setPlayer(s => ({ ...s, block: player.block + 1 }))
          break
        case 'Push':
          setPlayer(s => ({ ...s, push: player.push + 1 }))
          break
        case 'Woody':
          setPlayer(s => ({ ...s, woody: player.woody + 1 }))
          break
        case 'Bully':
          setPlayer(s => ({ ...s, bully: player.bully + 1 }))
          break
        case 'Foul':
          setPlayer(s => ({ ...s, foul: player.foul + 1 }))
          break
        default:
      }
    }
    if (player.bagnumber === 1) {
      setPlayer(s => ({ ...s, bag1: bagType }))
    }
    if (player.bagnumber === 2) {
      setPlayer(s => ({ ...s, bag2: bagType }))
    }
    if (player.bagnumber === 3) {
      setPlayer(s => ({ ...s, bag3: bagType }))
    }
    if (player.bagnumber === 4) {
      setPlayer(s => ({ ...s, bag4: bagType, bagnumber: '-', bagsThrown: player.bagsThrown + 1 }))
    }
    if (player.bagnumber < 4) {
      setPlayer(s => ({ ...s, bagnumber: player.bagnumber + 1, bagsThrown: player.bagsThrown + 1 }))
    }
  }

  function ScoreRound() {
    // player.roundScore > OpponentsScore
    //   ? setStartingTeamOne(true)
    //   : player.roundScore < OpponentsScore
    //   ? setStartingTeamOne(false)
    //   : setStartingTeamOne(startingTeamOne)
    let teamOneScore = player.roundScore - OpponentsScore < 0 ? 0 : player.roundScore - OpponentsScore

    setPlayer(s => ({
      ...s,
      score: teamOneScore + player.score,
      totalPoints: player.totalPoints + player.roundScore,
      fourBaggers: player.roundScore === 12 ? player.fourBaggers + 1 : player.fourBaggers
    }))

    // if (teamOneScore + player.score >= 21 ) {
    //   setIsGameOver(true)
    // } else {
    //   setRoundNumber(roundNumber + 1)
    //   setPlayer(s => ({ ...s, bagnumber: 1 }))
    // }

    setHistory([
      ...history,
      {
        round: roundNumber,
        ...player,
        bags: [player.bag1, player.bag2, player.bag3, player.bag4]
      }
    ])
    ClearRound()
  }

  function ClearRound() {
    setPlayer(s => ({ ...s, roundScore: 0 }))
  }

  return (
    <>
      <Card style={{ margin: '10px', padding: '10px', alignItems: 'end', textAlign: 'center', width: '255x', height: '450px' }}>
        <TextField size='small' value={player.teamName} onChange={e => setPlayer(f => ({ ...f, teamName: e.target.value }))} />
        <h1>{player.score}</h1>
        <h2>{player.roundScore}</h2>
        {isGameOver ? (
          player.score > 21 ? (
            <div>{player.teamName} Wins</div>
          ) : (
            <></>
          )
        ) : (
          <>
            <h4>
              <Button variant='outlined' onClick={() => AddPlayerPoints(3)} disabled={isGameOver}>
                +3
              </Button>
              <Button variant='outlined' onClick={() => AddPlayerPoints(2)} disabled={isGameOver}>
                +2
              </Button>
              <Button variant='outlined' onClick={() => AddPlayerPoints(1)} disabled={isGameOver}>
                +1
              </Button>
              <Button variant='outlined' onClick={() => AddPlayerPoints(-1)} disabled={isGameOver}>
                -1
              </Button>
            </h4>
            <h2>Shot {player.bagnumber}</h2>
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
                onMouseOver={() => setBagDescription('A bag that pushes or “bullies” your opponents bag out of the danger zone')}
                onMouseLeave={() => setBagDescription('')}>
                Bully
              </Button>
            </div>
          </>
        )}
      </Card>
    </>
  )
}
