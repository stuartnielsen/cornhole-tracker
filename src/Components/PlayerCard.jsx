import { Button, Card, Divider } from '@mui/material'
import { useEffect, useState } from 'react'
import PlayerStats from './PlayerStats'

export default function PlayerCard({
  isGameOver,
  setBagDescription,
  fourBaggers,
  setScore,
  roundNumber,
  gamePoints,
  roundPoints,
  bagNumber,
  setBagNumber,
  totalRounds,
  activePlayer,
  players,
  Player,
  history
}) {
  // console.log(Player)

  // const index = history.findIndex(item => item.teamName === players)
  // const [Player, setPlayer] = useState({
  //   id: history[index].id,
  //   teamName: history[index].teamName,
  //   totalRounds: parseInt(history[index].totalRounds),
  //   totalPoints: parseInt(history[index].totalPoints),
  //   pprAvg: parseInt(history[index].pprAvg),
  //   fourBaggers: parseInt(history[index].fourBaggers),
  //   bagsThrown: parseInt(history[index].bagsThrown),
  //   slide: parseInt(history[index].slide),
  //   airmail: parseInt(history[index].airmail),
  //   roll: parseInt(history[index].roll),
  //   block: parseInt(history[index].block),
  //   push: parseInt(history[index].push),
  //   woody: parseInt(history[index].woody),
  //   bully: parseInt(history[index].bully),
  //   foul: parseInt(history[index].foul)
  // })

  // useEffect(() => {
  //   history[index].totalPoints = Player.totalPoints
  //   history[index].totalRounds = totalRounds
  //   history[index].pprAvg = Player.pprAvg
  //   history[index].fourBaggers = fourBaggers
  //   history[index].bagsThrown = Player.bagsThrown + 1
  //   history[index].slide = Player.slide
  //   history[index].airmail = Player.airmail
  //   history[index].roll = Player.roll
  //   history[index].block = Player.block
  //   history[index].push = Player.push
  //   history[index].woody = Player.woody
  //   history[index].bully = Player.bully
  //   history[index].foul = Player.foul
  //   history[index].totalPoints = Player.totalPoints
  // }, [history, index, Player, totalRounds, fourBaggers])

  useEffect(() => {
    if (totalRounds !== 0) {
      Player.pprAvg = Player.totalPoints / Player.totalRounds
    }
  }, [Player.totalPoints, totalRounds, Player])

  useEffect(() => {
    Player.score = gamePoints
    Player.fourBaggers = fourBaggers
  }, [gamePoints, fourBaggers, Player])

  useEffect(() => {
    setScore(roundPoints)
    Player.roundScore = roundPoints
  }, [roundPoints, setScore, Player.fourBaggers, Player])

  function AddPlayerPoints(points) {
    if (roundPoints + points <= 12 && (roundPoints > 0 || points > 0)) {
      setScore(points + roundPoints)
      Player.totalPoints += points
    }
  }

  function AddBagTeamOne(bagType) {
    if (bagNumber < 5) {
      switch (bagType) {
        case 'Slide':
          Player.slide += 1
          AddPlayerPoints(3)
          break
        case 'Airmail':
          Player.airmail += 1
          AddPlayerPoints(3)
          break
        case 'Roll':
          Player.roll += 1
          AddPlayerPoints(3)
          break
        case 'Block':
          Player.block += 1
          AddPlayerPoints(1)
          break
        case 'Push':
          Player.push += 1
          break
        case 'Woody':
          Player.woody += 1
          AddPlayerPoints(1)
          break
        case 'Bully':
          Player.bully += 1
          break
        case 'Foul':
          Player.foul += 1
          break
        default:
      }
    }
    if (bagNumber === 4) {
      Player.bagsThrown += 1
      setBagNumber('-')
    }
    if (bagNumber < 4) {
      Player.bagnumber += 1
      Player.bagsThrown += 1
      setBagNumber(bagNumber + 1)
    }
  }
  if (isGameOver) {
    // Player.totalPoints = Player.totalPoints
    // history[index].totalRounds = totalRounds
    // history[index].pprAvg = Player.pprAvg
    // history[index].fourBaggers = fourBaggers
    // history[index].bagsThrown = Player.bagsThrown + 1
    // history[index].slide = Player.slide
    // history[index].airmail = Player.airmail
    // history[index].roll = Player.roll
    // history[index].block = Player.block
    // history[index].push = Player.push
    // history[index].woody = Player.woody
    // history[index].bully = Player.bully
    // history[index].foul = Player.foul
    // history[index].totalPoints = Player.totalPoints
  }

  return (
    <>
      <Card style={{ margin: '10px', padding: '10px', alignItems: 'end', textAlign: 'center', width: '280px', height: '450px' }}>
        <h2>{Player.teamName}</h2>
        <h1>{Player.score}</h1>
        <h2>{!activePlayer ? roundPoints : 0}</h2>
        {isGameOver ? (
          Player.score > 21 ? (
            <div>{Player.teamName} Wins</div>
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
                disabled={activePlayer}
                onMouseOver={() => setBagDescription('A bag that slides up the board and pushes a blocker in the hole')}
                onMouseLeave={() => setBagDescription('')}>
                Push
              </Button>
              <Button
                onClick={() => AddBagTeamOne('Woody')}
                style={{ width: '75px', margin: '10px 0px 0px 0px' }}
                variant='outlined'
                disabled={activePlayer}
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
                onMouseOver={() => setBagDescription('A bag that pushes or “bullies” your opponents bag out of the danger zone')}
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
      <PlayerStats player={Player} totalRounds={totalRounds} />
    </>
  )
}
