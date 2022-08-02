import { Button, Card, FormControl, InputLabel, MenuItem, Select, Switch } from '@mui/material'
import { useState } from 'react'
import GamePage from './GamePage'

export default function SetupGame() {
  const [file, setFile] = useState()
  const [playersStats, setPlayersStats] = useState([])
  const [startGame, setStartGame] = useState(false)
  const [isFourPlayer, setIsFourPlayer] = useState(false)
  const [playerOne, setPlayerOne] = useState()
  const [playerTwo, setPlayerTwo] = useState()
  const [playerThree, setPlayerThree] = useState()
  const [playerFour, setPlayerFour] = useState()

  const fileReader = new FileReader()

  const handleOnChange = e => {
    setFile(e.target.files[0])
  }

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf('\n')).split(',')
    const csvRows = string.slice(string.indexOf('\n') + 1).split('\n')

    const player = csvRows.map(i => {
      const values = i.split(',')
      const headers = csvHeader.reduce((object, header, index) => {
        object[header] = values[index]
        return object
      }, {})
      return headers
    })
    // setStartGame(true)
    setPlayersStats(player)
  }

  const handleOnSubmit = e => {
    e.preventDefault()

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result
        csvFileToArray(text)
      }

      fileReader.readAsText(file)
    }
  }

  //   const headerKeys = Object.keys(Object.assign({}, ...playersStats))

  return (
    <>
      {startGame ? (
        <GamePage
          isFourPlayer={isFourPlayer}
          players={isFourPlayer ? [playerOne, playerThree, playerTwo, playerFour] : [playerOne, playerThree]}
          history={playersStats}
        />
      ) : (
        <Card style={{ textAlign: 'center', width: '300px' }}>
          <h1>REACTJS CSV IMPORT</h1>

          <div>
            <label>Four Players</label>
            <Switch onChange={() => setIsFourPlayer(!isFourPlayer)} />
          </div>
          <div>
            {/* Team one */}
            <h4>Team One</h4>
            <FormControl variant='outlined' size='small' fullWidth>
              <InputLabel id='playerOneLabel'>{isFourPlayer ? 'Side One' : 'Player One'}</InputLabel>
              <Select
                labelId='playerOneLabel'
                value={playerOne ? playerOne : ''}
                label='name'
                onChange={e => setPlayerOne(e.target.value)}>
                {playersStats.map(x => (
                  <MenuItem value={x.teamName} key={x.teamName}>
                    {x.teamName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {isFourPlayer ? (
              <FormControl variant='outlined' size='small' fullWidth>
                <InputLabel id='playerTwoLabel'> Side Two</InputLabel>
                <Select
                  labelId='playerTwoLabel'
                  value={playerTwo ? playerTwo : ''}
                  label='Player'
                  onChange={e => setPlayerTwo(e.target.value)}>
                  {playersStats.map(x => (
                    <MenuItem value={x.teamName} key={x.teamName}>
                      {x.teamName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <></>
            )}

            {/* Team Two */}
            <h4>Team Two</h4>
            <FormControl variant='outlined' size='small' fullWidth>
              <InputLabel id='playerThreeLabel'>{isFourPlayer ? 'Side One' : 'Player Two'}</InputLabel>
              <Select
                labelId='playerThreeLabel'
                value={playerThree ? playerThree : ''}
                label='name'
                onChange={e => setPlayerThree(e.target.value)}>
                {playersStats.map(x => (
                  <MenuItem value={x.teamName} key={x.teamName}>
                    {x.teamName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {isFourPlayer ? (
              <FormControl variant='outlined' size='small' fullWidth>
                <InputLabel id='playerFourLabel'> Side Two</InputLabel>
                <Select
                  labelId='playerFourLabel'
                  value={playerFour ? playerFour : ''}
                  label='name'
                  onChange={e => setPlayerFour(e.target.value)}>
                  {playersStats.map(x => (
                    <MenuItem value={x.teamName} key={x.teamName}>
                      {x.teamName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <></>
            )}
          </div>
          <form>
            <input type={'file'} id={'csvFileInput'} accept={'.csv'} onChange={handleOnChange} />
            <div>
              <button
                onClick={e => {
                  handleOnSubmit(e)
                }}>
                Import Stats
              </button>
            </div>
          </form>

          <br />

          {/* <PlayerTableStats headers={headerKeys} rows={playersStats} /> */}
          <Button variant='outlined' onClick={() => setStartGame(true)}>
            Start Game
          </Button>
        </Card>
      )}
    </>
  )
}
