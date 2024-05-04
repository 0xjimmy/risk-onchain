import { HTMLAttributes } from 'preact/compat'
import { Select } from './Input'

export interface SelectProps
  extends HTMLAttributes<HTMLSelectElement> { options: string[] | number[]}

export function CountrySelect({ options, ...otherProps }: SelectProps) {
return (
  <div className="flex flex-col space-y-1.5">
    <Select {...otherProps} id="deploy" placeholder="Alaska">
      {options.map(x => <option value={x}>{x}</option>)}
    </Select>
  </div>
)
}