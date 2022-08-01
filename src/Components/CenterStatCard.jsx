import { Card } from '@mui/material'

export default function CenterStatCard() {
  return (
    <>
      <Card style={{ margin: '10px', padding: '10px', textAlign: 'center', width: '255x', height: '520px' }}>
        <h3>Stats</h3>
        <h5 style={{ backgroundColor: 'lightGrey', marginBottom: '-10px' }}>Total Rounds / Total Points</h5>
        <h5 style={{ marginBottom: '-10px' }}>PPR Avg.</h5>
        <h5 style={{ backgroundColor: 'lightGrey', marginBottom: '-10px' }}>4 Baggers</h5>
        <h5 style={{ marginBottom: '-10px' }}>Bags Thrown</h5>
        <h5 style={{ backgroundColor: 'lightGrey', marginBottom: '-10px' }}>Slide / pct.</h5>
        <h5 style={{ marginBottom: '-10px' }}>Airmail / pct.</h5>
        <h5 style={{ backgroundColor: 'lightGrey', marginBottom: '-10px' }}>Roll / pct.</h5>
        <h5 style={{ marginBottom: '-10px' }}>Block / pct.</h5>
        <h5 style={{ backgroundColor: 'lightGrey', marginBottom: '-10px' }}>Push / pct.</h5>
        <h5 style={{ marginBottom: '-10px' }}>Woody / pct.</h5>
        <h5 style={{ backgroundColor: 'lightGrey', marginBottom: '-10px' }}>Bully / pct.</h5>
        <h5 style={{ marginBottom: '-10px' }}>Foul / pct.</h5>
      </Card>
    </>
  )
}
