import { Button, Card, FormControl, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import GamePage from './GamePage'

const DEFAULT_TEAM = {
  teamName: '',
  totalPoints: 0,
  totalRounds: 0,
  pprAvg: 0,
  fourBaggers: 0,
  bagsThrown: 0,
  slide: 0,
  airmail: 0,
  roll: 0,
  block: 0,
  push: 0,
  woody: 0,
  bully: 0,
  foul: 0
}

export default function SetupGame() {
  const [file, setFile] = useState()
  const [playersStats, setPlayersStats] = useState([])
  const [startGame, setStartGame] = useState(false)
  const [isFourPlayer, setIsFourPlayer] = useState(false)
  const [playerOne, setPlayerOne] = useState()
  const [playerTwo, setPlayerTwo] = useState()
  const [playerThree, setPlayerThree] = useState()
  const [playerFour, setPlayerFour] = useState()
  const [newPlayer, setNewPlayer] = useState(DEFAULT_TEAM)

  const fileReader = useMemo(() => new FileReader(), [])

  const handleOnChange = e => {
    setFile(e.target.files[0])
  }

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf('\n')).replaceAll('"', '').split(',')
    const csvRows = string
      .slice(string.indexOf('\n') + 1)
      .replaceAll('"', '')
      .split('\n')

    const player = csvRows.map(i => {
      const values = i.split(',')
      const headers = csvHeader.reduce((object, header, index) => {
        object[header] = values[index]
        return object
      }, {})
      return headers
    })
    setPlayersStats(player)
  }
  useEffect(() => {
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result
        csvFileToArray(text)
      }

      fileReader.readAsText(file)
    }
  }, [file, fileReader])

  //   const handleOnSubmit = e => {
  //     e.preventDefault()

  //     if (file) {
  //       fileReader.onload = function (event) {
  //         const text = event.target.result
  //         csvFileToArray(text)
  //       }

  //       fileReader.readAsText(file)
  //     }
  //   }

  //   const headerKeys = Object.keys(Object.assign({}, ...playersStats))

  function addPlayer() {
    setPlayersStats(curr => [...curr, newPlayer])
    setNewPlayer(s => ({ ...s, teamName: '' }))
  }
  console.log(playersStats)
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '350px'
      }}>
      {startGame ? (
        <>
          <GamePage
            isFourPlayer={isFourPlayer}
            players={isFourPlayer ? [playerOne, playerThree, playerTwo, playerFour] : [playerOne, playerThree]}
            history={playersStats}
            setStartGame={setStartGame}
          />
        </>
      ) : (
        <Card style={{ textAlign: 'center', width: '400px' }}>
          <h1>Create New Game</h1>
          {playersStats.length > 0 ? (
            <></>
          ) : (
            <form style={{ marginBottom: '20px' }}>
              <input type={'file'} id={'csvFileInput'} accept={'.csv'} onChange={handleOnChange} />
              {/* <button
                onClick={e => {
                  handleOnSubmit(e)
                }}>
                Load Players
              </button> */}
            </form>
          )}
          <div>
            <TextField
              size='small'
              value={newPlayer.teamName}
              onChange={e => setNewPlayer(f => ({ ...f, teamName: e.target.value }))}
              variant='outlined'
              label='New player'
            />
            <Button variant='outlined' onClick={() => addPlayer()} style={{ marginLeft: '10px', height: '40px' }}>
              Add
            </Button>
          </div>

          <div style={{ marginTop: '20px' }}>
            <label>Four Players</label>
            <Switch onChange={() => setIsFourPlayer(!isFourPlayer)} />
          </div>
          <div>
            {/* Team one */}
            <h4>Team One</h4>
            <FormControl variant='outlined' size='small' style={{ width: '300px' }}>
              <InputLabel id='playerOneLabel'>{isFourPlayer ? 'Side One' : 'Player One'}</InputLabel>
              <Select
                labelId='playerOneLabel'
                value={playerOne ? playerOne : ''}
                label={isFourPlayer ? 'Side One' : 'Player One'}
                onChange={e => setPlayerOne(e.target.value)}>
                {playersStats.map(x => (
                  <MenuItem value={x.teamName} key={x.teamName}>
                    {x.teamName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {isFourPlayer ? (
              <FormControl variant='outlined' size='small' style={{ width: '300px', marginTop: '10px' }}>
                <InputLabel id='playerTwoLabel'>Side Two</InputLabel>
                <Select
                  labelId='playerTwoLabel'
                  value={playerTwo ? playerTwo : ''}
                  label='Side Two'
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
            <FormControl variant='outlined' size='small' style={{ width: '300px' }}>
              <InputLabel id='playerThreeLabel'>{isFourPlayer ? 'Side One' : 'Player Two'}</InputLabel>
              <Select
                labelId='playerThreeLabel'
                value={playerThree ? playerThree : ''}
                label={isFourPlayer ? 'Side One' : 'Player Two'}
                onChange={e => setPlayerThree(e.target.value)}>
                {playersStats.map(x => (
                  <MenuItem value={x.teamName} key={x.teamName}>
                    {x.teamName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {isFourPlayer ? (
              <FormControl variant='outlined' size='small' style={{ width: '300px', marginTop: '10px' }}>
                <InputLabel id='playerFourLabel'>Side Two</InputLabel>
                <Select
                  labelId='playerFourLabel'
                  value={playerFour ? playerFour : ''}
                  label='Side Two'
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

          <br />

          {/* <PlayerTableStats headers={headerKeys} rows={playersStats} /> */}
          <Button variant='outlined' onClick={() => setStartGame(true)} style={{ marginBottom: '20px' }}>
            Start Game
          </Button>
        </Card>
      )}
    </div>
  )
}
