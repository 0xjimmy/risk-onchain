import { useSignal } from "@preact/signals"
import { createLobby } from "../state/game"
import { Button } from "./ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/Card"
import { Input, Label } from "./ui/Input"

export const CreateGame = () => {
  const gameName = useSignal<string>('')
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Game</CardTitle>
        <CardDescription>Create a lobby for others to join.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input onInput={(e) => gameName.value = e.currentTarget.value} id="name" placeholder="Game Name" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => createLobby()}>Create</Button>
      </CardFooter>
    </Card>)
}
