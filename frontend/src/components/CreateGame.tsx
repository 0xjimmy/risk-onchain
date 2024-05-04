import { useSignal } from "@preact/signals"
import { createLobby } from "../state/game"
import { Button } from "./ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/Card"
import { Input, Label, Select } from "./ui/Input"

export const CreateGame = () => {
  const gameName = useSignal<string>('')
  const gameLength = useSignal<number>(600)
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Game</CardTitle>
        <CardDescription>Create a lobby for others to join.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input onInput={(e) => gameName.value = e.currentTarget.value} id="name" placeholder="Game Name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="gameLen">Turn Length</Label>
              <Select id="gameLen" placeholder="Game Name">
                <option value={600}>10 minutes</option>
                <option value={1800}>30 minutes</option>
                <option value={14400}>4 hours</option>
                <option value={86400}>1 day</option>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => createLobby(BigInt(gameLength.value), gameName.value)}>Create</Button>
      </CardFooter>
    </Card>)
}
