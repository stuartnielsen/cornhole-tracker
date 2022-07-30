import { Card } from '@mui/material'

export default function CenterStatCard() {
  return (
    <>
      <Card style={{ margin: '10px', padding: '10px', textAlign: 'center', width: '255x', height: '520px' }}>
        <h3>Stats</h3>
        <h5>Total Rounds / Total Points</h5>
        <h5>PPR Avg.</h5>
        <h5>4 Baggers</h5>
        <h5>Bags Thrown</h5>
        <h5>Slide / pct.</h5>
        <h5>Airmail / pct.</h5>
        <h5>Roll / pct.</h5>
        <h5>Block / pct.</h5>
        <h5>Push / pct.</h5>
        <h5>Woody / pct.</h5>
        <h5>Bully / pct.</h5>
        <h5>Foul / pct.</h5>
      </Card>
    </>
  )
}
