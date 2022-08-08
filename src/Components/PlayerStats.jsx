import { Card } from '@mui/material'

export default function PlayerStats({ player, totalRounds }) {
  return (
    <>
      <Card style={{ margin: '10px', padding: '10px', textAlign: 'center', width: '255x', height: '520px' }}>
        <h3>{player.teamName}</h3>
        <h5 style={{ backgroundColor: 'lightGrey', marginBottom: '-10px' }}>
          {player.totalRounds} / {player.totalPoints}
        </h5>
        <h5 style={{ marginBottom: '-10px' }}>{parseFloat(player.pprAvg).toFixed(2)}</h5>
        <h5 style={{ backgroundColor: 'lightGrey', marginBottom: '-10px' }}>{player.fourBaggers}</h5>
        <h5 style={{ marginBottom: '-10px' }}>{player.bagsThrown}</h5>
        <h5 style={{ backgroundColor: 'lightGrey', marginBottom: '-10px' }}>
          {player.slide} / {((player.slide / player.bagsThrown) * 100).toFixed(2)}
        </h5>
        <h5 style={{ marginBottom: '-10px' }}>
          {player.airmail} / {((player.airmail / player.bagsThrown) * 100).toFixed(2)}
        </h5>
        <h5 style={{ backgroundColor: 'lightGrey', marginBottom: '-10px' }}>
          {player.roll} / {((player.roll / player.bagsThrown) * 100).toFixed(2)}
        </h5>
        <h5 style={{ marginBottom: '-10px' }}>
          {player.block} / {((player.block / player.bagsThrown) * 100).toFixed(2)}
        </h5>
        <h5 style={{ backgroundColor: 'lightGrey', marginBottom: '-10px' }}>
          {player.push * 1} / {((player.push / player.bagsThrown) * 100).toFixed(2)}
        </h5>
        <h5 style={{ marginBottom: '-10px' }}>
          {player.woody} / {((player.woody / player.bagsThrown) * 100).toFixed(2)}
        </h5>
        <h5 style={{ backgroundColor: 'lightGrey', marginBottom: '-10px' }}>
          {parseInt(player.bully)} / {((player.bully / player.bagsThrown) * 100).toFixed(2)}
        </h5>
        <h5 style={{ marginBottom: '-10px' }}>
          {player.foul}/ {((player.foul / player.bagsThrown) * 100).toFixed(2)}
        </h5>
      </Card>
    </>
  )
}
