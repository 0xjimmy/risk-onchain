import { Button } from "./ui/Button"
import { attack, deployTroops, remainingDeploy, turnNewPop } from "../engine/state"
import { TERRITORIES } from "../engine/constants"
import { CountrySelect } from "./ui/CountrySelect"
import { useSignal } from "@preact/signals"

const deploymentAmounts = [
  (turnNewPop.value / 4).toFixed(),
  (turnNewPop.value / 4).toFixed(),
  (turnNewPop.value / 4).toFixed(),
  (turnNewPop.value - (3 * turnNewPop.value / 4)).toFixed()
]


export const TurnSelection = () => {
  const deploymentTerritories = useSignal<number[]>([0, 0, 0, 0])
  const attackFromTerritories = useSignal<number[]>([])
  const attackToTerritories = useSignal<number[]>([])

  function submit() {
    deployTroops(deploymentTerritories.value[0], BigInt(deploymentAmounts[0]))
    deployTroops(deploymentTerritories.value[1], BigInt(deploymentAmounts[0]))
    deployTroops(deploymentTerritories.value[2], BigInt(deploymentAmounts[0]))
    deployTroops(deploymentTerritories.value[3], BigInt(deploymentAmounts[0]))

    if (attackFromTerritories.value[0] != undefined && attackToTerritories.value[0] != undefined) {
      attack(attackFromTerritories.value[0], attackToTerritories.value[0])
    }
    if (attackFromTerritories.value[1] != undefined && attackToTerritories.value[1] != undefined) {
      attack(attackFromTerritories.value[1], attackToTerritories.value[1])
    }
    if (attackFromTerritories.value[2] != undefined && attackToTerritories.value[2] != undefined) {
      attack(attackFromTerritories.value[2], attackToTerritories.value[2])
    }
    if (attackFromTerritories.value[3] != undefined && attackToTerritories.value[3] != undefined) {
      attack(attackFromTerritories.value[3], attackToTerritories.value[3])
    }
  }

  return (
    <div>
      <h1>Deploy {remainingDeploy.value}</h1>
      <div class="grid grid-cols-2 gap-4">
        <h2>Where</h2><div />
        <CountrySelect
          onInput={(e) => {
            deploymentTerritories.value[0] = TERRITORIES.indexOf(e.currentTarget.value)
            deploymentTerritories.value = deploymentTerritories.value
          }}
          options={TERRITORIES}
        />
        <div>{deploymentAmounts[0]} troops</div>
        <CountrySelect
          onInput={(e) => {
            deploymentTerritories.value[1] = TERRITORIES.indexOf(e.currentTarget.value)
            deploymentTerritories.value = deploymentTerritories.value
          }}
          options={TERRITORIES}
        />
        <div>{deploymentAmounts[1]} troops</div>
        <CountrySelect
          onInput={(e) => {
            deploymentTerritories.value[2] = TERRITORIES.indexOf(e.currentTarget.value)
            deploymentTerritories.value = deploymentTerritories.value
          }}
          options={TERRITORIES}
        />
        <div>{deploymentAmounts[2]} troops</div>
        <CountrySelect
          onInput={(e) => {
            deploymentTerritories.value[3] = TERRITORIES.indexOf(e.currentTarget.value)
            deploymentTerritories.value = deploymentTerritories.value
          }}
          options={TERRITORIES}
        />
        <div>{deploymentAmounts[3]} troops</div>
      </div>
      <h1>Attack</h1>
      <div class="grid grid-cols-2 gap-4">
        <h2>From</h2><h2>To</h2>
        <CountrySelect
          onInput={(e) => {
            attackFromTerritories.value[0] = TERRITORIES.indexOf(e.currentTarget.value)
            attackFromTerritories.value = attackFromTerritories.value
          }}
          options={TERRITORIES}
        />
        <CountrySelect
          onInput={(e) => {
            attackToTerritories.value[0] = TERRITORIES.indexOf(e.currentTarget.value)
            attackToTerritories.value = attackToTerritories.value
          }}
          options={TERRITORIES}
        />
        <CountrySelect
          onInput={(e) => {
            attackFromTerritories.value[1] = TERRITORIES.indexOf(e.currentTarget.value)
            attackFromTerritories.value = attackFromTerritories.value
          }}
          options={TERRITORIES}
        />
        <CountrySelect
          onInput={(e) => {
            attackToTerritories.value[1] = TERRITORIES.indexOf(e.currentTarget.value)
            attackToTerritories.value = attackToTerritories.value
          }}
          options={TERRITORIES}
        />
        <CountrySelect
          onInput={(e) => {
            attackFromTerritories.value[2] = TERRITORIES.indexOf(e.currentTarget.value)
            attackFromTerritories.value = attackFromTerritories.value
          }}
          options={TERRITORIES}
        />
        <CountrySelect
          onInput={(e) => {
            attackToTerritories.value[2] = TERRITORIES.indexOf(e.currentTarget.value)
            attackToTerritories.value = attackToTerritories.value
          }}
          options={TERRITORIES}
        />
        <CountrySelect
          onInput={(e) => {
            attackFromTerritories.value[3] = TERRITORIES.indexOf(e.currentTarget.value)
            attackFromTerritories.value = attackFromTerritories.value
          }}
          options={TERRITORIES}
        />
        <CountrySelect
          onInput={(e) => {
            attackToTerritories.value[3] = TERRITORIES.indexOf(e.currentTarget.value)
            attackToTerritories.value = attackToTerritories.value
          }}
          options={TERRITORIES}
        />
      </div>
      <Button onClick={() => submit()}>Submit</Button>
    </div>)
}
