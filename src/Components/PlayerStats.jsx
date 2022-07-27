import { Card } from '@mui/material'

export default function PlayerStats({ player }) {
  return (
    <>
      <Card style={{ margin: '10px', padding: '10px', textAlign: 'center', width: '255x', height: '480px' }}>
        <h3>{player.teamName}</h3>
        <h5>{player.totalPoints}</h5>
        <h5>{player.pprAvg}</h5>
        <h5>{player.pprAvg}</h5>
        <h5>{player.pprAvg}</h5>
        <h5>{player.pprAvg}</h5>
        <h5>{player.pprAvg}</h5>
        <h5>{player.pprAvg}</h5>
        <h5>{player.pprAvg}</h5>
        <h5>{player.pprAvg}</h5>
        <h5>{player.pprAvg}</h5>
        <h5>{player.pprAvg}</h5>
      </Card>
    </>
  )
}
