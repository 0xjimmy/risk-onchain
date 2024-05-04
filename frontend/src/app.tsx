import './app.css'
import Board from './Board'
import { CreateGame } from './components/CreateGame'
import { JoinGame } from './components/JoinGame'
import { Button } from './components/ui/Button'
import { TurnSelection } from './components/TurnSelection'
import { game } from './state/game'
import { doZK } from './zk'

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
          <TurnSelection />
          <Board />
        </div>) : null
      }
      <Button onClick={doZK}>ZK Test</Button>
    </>

  )
}
