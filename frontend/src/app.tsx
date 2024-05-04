import './app.css'
import Board from './Board'

import { CreateGame } from './components/CreateGame'
import { JoinGame } from './components/JoinGame'
import { game } from './state/game'



export function App() {
  return (
    <>
      {!game.value ? (
        <div class="w-screen min-h-screen h-full flex items-center justify-center gap-4">
          <JoinGame />
          <CreateGame />
        </div>) : null
      }
      {game.value ? (
        <div class="w-screen min-h-screen h-full flex items-center justify-center gap-4">
          <Board />
        </div>) : null
      }
    </>

  )
}
