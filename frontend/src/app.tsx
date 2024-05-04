import './app.css'
import Board from './Board'
import { CreateGame } from './components/CreateGame'
import { JoinGame } from './components/JoinGame'
import { Button } from './components/ui/Button'
import { TurnSelection } from './components/TurnSelection'
import { game } from './state/game'
import { connectWallet, provider } from './state/network'
import { useComputed } from '@preact/signals'

export function App() {
  const appStage = useComputed<"login" | "lobby" | "game">(() => {
    // if (!provider.value) return "login"
    if (!game.value) return "lobby"
    return "game"
  })
  return (
    <>
      <div class="w-screen min-h-screen h-full flex items-center justify-center gap-4">
        {/* {appStage.value === 'login' ? <Button onClick={connectWallet}>Connect Wallet</Button> : null} */}
        {appStage.value === 'lobby' && !game.value ? (
          <div class="w-screen min-h-screen h-full flex items-center justify-center gap-4">
            <JoinGame />
            <CreateGame />
          </div>) : null}
        {appStage.value === 'game' && game.value ?
          <div class="w-screen min-h-screen h-full flex items-center justify-center gap-4">
            <TurnSelection />
            <Board />
          </div> : null}
      </div>
    </>)
}
