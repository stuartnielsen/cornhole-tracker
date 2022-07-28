import { Card } from '@mui/material'

export default function PlayerStats({ player }) {
  return (
    <>
      <Card style={{ margin: '10px', padding: '10px', textAlign: 'center', width: '255x', height: '520px' }}>
        <h3>{player.teamName}</h3>
        <h5>{player.totalPoints}</h5>
        <h5>{player.pprAvg}</h5>
        <h5>{player.fourBaggers}</h5>
        <h5>{player.bagsThrown}</h5>
        <h5>{player.slide}</h5>
        <h5>{player.airmail}</h5>
        <h5>{player.roll}</h5>
        <h5>{player.block}</h5>
        <h5>{player.push}</h5>
        <h5>{player.woody}</h5>
        <h5>{player.bully}</h5>
        <h5>{player.foul}</h5>
      </Card>
    </>
  )
}
