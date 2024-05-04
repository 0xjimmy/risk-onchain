import { Button } from "./ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/Card"
import { Input, Label, Select } from "./ui/Input"

export const JoinGame = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Join Game</CardTitle>
        <CardDescription>Create a lobby for others to join.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Game Name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="gameLen">Turn Length</Label>
              <Select id="gameLen" placeholder="Game Name">
                <option>10 minutes</option>
                <option>30 minutes</option>
                <option>4 hours</option>
                <option>1 day</option>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Create</Button>
      </CardFooter>
      {/* <CardFooter className="flex justify-between"> */}
      {/*   <Button variant="outline">Cancel</Button> */}
      {/*   <Button>Create</Button> */}
      {/* </CardFooter> */}
    </Card>)
}
