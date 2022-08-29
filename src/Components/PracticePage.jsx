import { Button, Card, Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material'
// import { useEffect } from 'react'
import { useState } from 'react'

const DEFAULT_SHOT_TYPES = {
  slide: false,
  airmail: false,
  roll: false,
  block: false,
  push: false,
  woody: false,
  bully: false
}

export default function PracticePage({ setStartGame }) {
  //   const [slideShot, setSlideShot] = useState(false)
  const [shotTypes, setShotTypes] = useState(DEFAULT_SHOT_TYPES)

  function clearChecked() {
    setShotTypes(s => ({
      ...s,
      slide: false,
      airmail: false,
      roll: false,
      block: false,
      push: false,
      woody: false,
      bully: false
    }))
  }

  function nextShot() {
    let shot = shotTypes[Math.floor(Math.random() * 7)]
    console.log(shot)
  }

  return (
    <>
      <Grid container>
        <Grid>
          <Card
            style={{ margin: '10px', padding: '10px', alignItems: 'end', textAlign: 'center', width: '280px', height: '450px' }}>
            <h1>Player Name</h1>
          </Card>
        </Grid>
        <Grid>
          <Card
            style={{ margin: '10px', padding: '10px', alignItems: 'end', textAlign: 'center', width: '280px', height: '450px' }}>
            <h1>{shotTypes.slide}</h1>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={shotTypes.slide} />}
                label='Slide Shot'
                onChange={() => setShotTypes(s => ({ ...s, slide: !shotTypes.slide }))}
              />
              <FormControlLabel
                control={<Checkbox checked={shotTypes.airmail} />}
                label='Airmail Shot'
                onChange={() => setShotTypes(s => ({ ...s, airmail: !shotTypes.airmail }))}
              />
              <FormControlLabel
                control={<Checkbox checked={shotTypes.roll} />}
                label='Roll Shot'
                onChange={() => setShotTypes(s => ({ ...s, roll: !shotTypes.roll }))}
              />
              <FormControlLabel
                control={<Checkbox checked={shotTypes.block} />}
                label='Block Shot'
                onChange={() => setShotTypes(s => ({ ...s, block: !shotTypes.block }))}
              />
              <FormControlLabel
                control={<Checkbox checked={shotTypes.push} />}
                label='Push Shot'
                onChange={() => setShotTypes(s => ({ ...s, push: !shotTypes.push }))}
              />
              <FormControlLabel
                control={<Checkbox checked={shotTypes.woody} />}
                label='Woody Shot'
                onChange={() => setShotTypes(s => ({ ...s, woody: !shotTypes.woody }))}
              />
              <FormControlLabel
                control={<Checkbox checked={shotTypes.bully} />}
                label='Bully Shot'
                onChange={() => setShotTypes(s => ({ ...s, bully: !shotTypes.bully }))}
              />
            </FormGroup>
            <Button onClick={() => clearChecked()}>Clear All</Button>
          </Card>
          <Button onClick={() => setStartGame(false)} variant='outlined'>
            Finish Practice
          </Button>
        </Grid>
        <Grid>
          <Card
            style={{ margin: '10px', padding: '10px', alignItems: 'end', textAlign: 'center', width: '280px', height: '450px' }}>
            <h1>This Shot</h1>
            <Button color='success' variant='outlined' onClick={() => nextShot()}>
              Success
            </Button>
            <Button color='error' variant='outlined' onClick={() => nextShot()}>
              Error
            </Button>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
