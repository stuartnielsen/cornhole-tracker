import { Button, Card, Divider } from '@mui/material'
import { useEffect } from 'react'
import PlayerStats from './PlayerStats'

export default function PlayerCard({
  isGameOver,
  setBagDescription,
  setScore,
  gamePoints,
  roundPoints,
  bagNumber,
  setBagNumber,
  totalRounds,
  activePlayer,
  player,
  setPlayer
}) {
  useEffect(() => {
    if (player.totalRounds !== 0) {
      setPlayer(s => ({
        ...s,
        pprAvg: player.totalPoints / player.totalRounds
      }))
    }
  }, [player.totalPoints, totalRounds, setPlayer, player.totalRounds])

  useEffect(() => {
    setPlayer(s => ({ ...s, score: gamePoints }))
  }, [gamePoints, setPlayer])

  useEffect(() => {
    setScore(roundPoints)
    setPlayer(s => ({ ...s, roundScore: roundPoints }))
  }, [roundPoints, setScore, setPlayer])

  function AddPlayerPoints(points) {
    if (roundPoints + points <= 12 && (roundPoints > 0 || points > 0)) {
      setScore(points + roundPoints)
      setPlayer(s => ({ ...s, totalPoints: player.totalPoints + points }))
    }
  }

  function AddBagTeamOne(bagType) {
    if (bagNumber < 5) {
      switch (bagType) {
        case 'Slide':
          setPlayer(s => ({ ...s, slide: player.slide + 1 }))
          AddPlayerPoints(3)
          break
        case 'Airmail':
          setPlayer(s => ({ ...s, airmail: player.airmail + 1 }))
          AddPlayerPoints(3)
          break
        case 'Roll':
          setPlayer(s => ({ ...s, roll: player.roll + 1 }))
          AddPlayerPoints(3)
          break
        case 'Block':
          setPlayer(s => ({ ...s, block: player.block + 1 }))
          AddPlayerPoints(1)
          break
        case 'Push':
          setPlayer(s => ({ ...s, push: player.push + 1 }))
          break
        case 'Woody':
          setPlayer(s => ({ ...s, woody: player.woody + 1 }))
          AddPlayerPoints(1)
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
    if (bagNumber === 4) {
      setPlayer(s => ({ ...s, bagnumber: 5, bagsThrown: player.bagsThrown + 1 }))
      setBagNumber('-')
    }
    if (bagNumber < 4) {
      setPlayer(s => ({ ...s, bagnumber: player.bagnumber + 1, bagsThrown: player.bagsThrown + 1 }))
      setBagNumber(bagNumber + 1)
    }
  }

  return (
    <>
      <Card style={{ margin: '10px', padding: '10px', alignItems: 'end', textAlign: 'center', width: '280px', height: '450px' }}>
        <h2>{player.teamName}</h2>
        <h1>{player.score}</h1>
        <h2>{!activePlayer ? roundPoints : 0}</h2>
        {isGameOver ? (
          player.score > 21 ? (
            <div>{player.teamName} Wins</div>
          ) : (
            <></>
          )
        ) : (
          <>
            <h2>Shot {bagNumber < 5 ? bagNumber : '-'}</h2>
            <div>
              <Button
                onClick={() => AddBagTeamOne('Slide')}
                style={{ width: '75px', margin: '10px 10px 0px 0px' }}
                color='success'
                variant='outlined'
                disabled={activePlayer}
                onMouseOver={() => setBagDescription('A bag that lands in front of the hole and slides in')}
                onMouseLeave={() => setBagDescription('')}>
                Slide
              </Button>
              <Button
                onClick={() => AddBagTeamOne('Airmail')}
                style={{ width: '75px', margin: '10px 10px 0px 0px' }}
                color='success'
                variant='outlined'
                disabled={activePlayer}
                onMouseOver={() => setBagDescription('A bag that goes directly into the whole and does not slide or bounce')}
                onMouseLeave={() => setBagDescription('')}>
                Airmail
              </Button>
              <Button
                onClick={() => AddBagTeamOne('Roll')}
                style={{ width: '75px', margin: '10px 0px 0px 0px' }}
                color='success'
                variant='outlined'
                disabled={activePlayer}
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
                disabled={activePlayer}
                onMouseOver={() => setBagDescription('A bag that lands in front blocking the hole from a slide shot')}
                onMouseLeave={() => setBagDescription('')}>
                Block
              </Button>
              <Button
                onClick={() => AddBagTeamOne('Push')}
                style={{ width: '75px', margin: '10px 10px 0px 0px' }}
                variant='outlined'
                disabled={activePlayer}
                onMouseOver={() => setBagDescription('A bag that slides pushes a blocker in the hole')}
                onMouseLeave={() => setBagDescription('')}>
                Push
              </Button>
              <Button
                onClick={() => AddBagTeamOne('Woody')}
                style={{ width: '75px', margin: '10px 0px 0px 0px' }}
                variant='outlined'
                disabled={activePlayer}
                onMouseOver={() => setBagDescription('A bag that lands on the board but does not block it')}
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
                disabled={activePlayer}
                onMouseOver={() => setBagDescription('A bag that is on, hit, or touching the ground')}
                onMouseLeave={() => setBagDescription('')}>
                Foul
              </Button>
              <Button
                onClick={() => AddBagTeamOne('Bully')}
                style={{ width: '75px', margin: '10px 10px 0px 0px' }}
                color='error'
                variant='outlined'
                disabled={activePlayer}
                onMouseOver={() => setBagDescription('A bag that pushes your another bag out of the danger zone')}
                onMouseLeave={() => setBagDescription('')}>
                Bully
              </Button>
            </div>
            <Divider style={{ margin: '10px -10px -10px -10px' }} />
            <h4>
              <Button variant='outlined' onClick={() => AddPlayerPoints(3)} disabled={isGameOver || activePlayer}>
                +3
              </Button>
              <Button variant='outlined' onClick={() => AddPlayerPoints(2)} disabled={isGameOver || activePlayer}>
                +2
              </Button>
              <Button variant='outlined' onClick={() => AddPlayerPoints(1)} disabled={isGameOver || activePlayer}>
                +1
              </Button>
              <Button variant='outlined' onClick={() => AddPlayerPoints(-1)} disabled={isGameOver || activePlayer}>
                -1
              </Button>
            </h4>
          </>
        )}
      </Card>
      <PlayerStats player={player} totalRounds={totalRounds} />
    </>
  )
}
