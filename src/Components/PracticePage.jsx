import { Button, Card, Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material'
import { useEffect, useState } from 'react'

const DEFAULT_SHOT_TYPES = {
  slide: false,
  airmail: false,
  roll: false,
  block: false,
  push: false,
  woody: false,
  bully: false
}

export default function PracticePage({ setStartGame, history, player }) {
  const [shotTypes, setShotTypes] = useState(DEFAULT_SHOT_TYPES)
  const [activeShots, setActiveShots] = useState([])
  const [nextPracticeShot, setNextPracticeShot] = useState('')
  const [playerOne, setPlayerOne] = useState(history[history.findIndex(item => item.teamName === player)])

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
    setNextPracticeShot('')
  }

  useEffect(() => {
    let activeShotsArray = []
    if (shotTypes.slide) activeShotsArray.push('Slide')
    if (shotTypes.airmail) activeShotsArray.push('Airmail')
    if (shotTypes.roll) activeShotsArray.push('Roll')
    if (shotTypes.block) activeShotsArray.push('Block')
    if (shotTypes.push) activeShotsArray.push('Push')
    if (shotTypes.woody) activeShotsArray.push('Woody')
    if (shotTypes.bully) activeShotsArray.push('Bully')
    setActiveShots(activeShotsArray)
  }, [shotTypes])

  //   useEffect(()=> {},[playerOne])

  function handleShot(shot, success = false) {
    setPlayerOne(s => ({ ...s, [`Practice${shot}Attempt`]: playerOne[`Practice${shot}Attempt`] + 1 }))
    if (success) setPlayerOne(s => ({ ...s, [`Practice${shot}Success`]: playerOne[`Practice${shot}Success`] + 1 }))
    console.log(playerOne[shot])
    nextShot()
  }

  function nextShot() {
    let shot = activeShots[Math.floor(Math.random() * activeShots.length)]
    setNextPracticeShot(shot)
  }
  console.log(playerOne)

  return (
    <>
      <Grid container>
        <Grid>
          <Card
            style={{ margin: '10px', padding: '10px', alignItems: 'end', textAlign: 'center', width: '280px', height: '450px' }}>
            <h1>{player}</h1>
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
            hidden={activeShots.length === 0}
            style={{ margin: '10px', padding: '10px', alignItems: 'end', textAlign: 'center', width: '280px', height: '450px' }}>
            <h1>{nextPracticeShot}</h1>
            {nextPracticeShot === '' ? (
              <Button variant='outlined' onClick={() => nextShot()}>
                Start
              </Button>
            ) : (
              <>
                <Button
                  disabled={nextPracticeShot === ''}
                  color='success'
                  variant='outlined'
                  onClick={() => handleShot(nextPracticeShot, true)}>
                  Success
                </Button>
                <Button
                  disabled={nextPracticeShot === ''}
                  color='error'
                  variant='outlined'
                  onClick={() => handleShot(nextPracticeShot)}>
                  Error
                </Button>
              </>
            )}
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
