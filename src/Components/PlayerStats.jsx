import { Card } from '@mui/material'

export default function PlayerStats({ player, totalRounds }) {
  return (
    <>
      <Card style={{ margin: '10px', padding: '10px', textAlign: 'center', width: '255x', height: '520px' }}>
        <h3>{player.teamName}</h3>
        <h5>
          {totalRounds} / {player.totalPoints}
        </h5>
        <h5>{player.pprAvg.toFixed(2)}</h5>
        <h5>{player.fourBaggers}</h5>
        <h5>{player.bagsThrown}</h5>
        <h5>
          {player.slide} / {((player.slide / player.bagsThrown) * 100).toFixed(2)}
        </h5>
        <h5>
          {player.airmail} / {((player.airmail / player.bagsThrown) * 100).toFixed(2)}
        </h5>
        <h5>
          {player.roll} / {((player.roll / player.bagsThrown) * 100).toFixed(2)}
        </h5>
        <h5>
          {player.block} / {((player.block / player.bagsThrown) * 100).toFixed(2)}
        </h5>
        <h5>
          {player.push} / {((player.push / player.bagsThrown) * 100).toFixed(2)}
        </h5>
        <h5>
          {player.woody} / {((player.woody / player.bagsThrown) * 100).toFixed(2)}
        </h5>
        <h5>
          {player.bully} / {((player.bully / player.bagsThrown) * 100).toFixed(2)}
        </h5>
        <h5>
          {player.foul}/ {((player.foul / player.bagsThrown) * 100).toFixed(2)}
        </h5>
      </Card>
    </>
  )
}
