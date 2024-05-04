import { Button } from "./ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/Card"
import { Input, Label, Select } from "./ui/Input"
import { turnNewPop } from "../engine/state"

export const TurnSelection = () => {
  return (
    <div>
      <h1>Deploy</h1>
      <div class="grid grid-cols-2 gap-4">
        <h2>Where</h2><div />
        <Input/><div>{(turnNewPop.value / 4) + (turnNewPop.value % 4)} troops</div>
        <Input/><div>{turnNewPop.value / 4} troops</div>
        <Input/><div>{turnNewPop.value / 4} troops</div>
        <Input/><div>{turnNewPop.value / 4} troops</div>
      </div>
      <h1>Attack</h1>
      <div class="grid grid-cols-2 gap-4">
        <h2>From</h2><h2>To</h2>
        <Input/><Input/>
        <Input/><Input/>
        <Input/><Input/>
        <Input/><Input/>
      </div>
    </div>)
}
