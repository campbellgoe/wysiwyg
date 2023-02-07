import styled from "styled-components"
import { BlockTypes } from "../config/blocks"

const TextBlock = styled.p`
  background: black;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
`

const TextInputBlock = styled(({ children, updateValue }) => {
  return (
    <input
      type="text"
      value={children}
      onChange={e => updateValue(e.target.value)}
    />
  )
})`
  background: white;
  color: black;
  padding: 1rem 2rem;
  border-radius: 8px;
  border: 1px dashed black;
`

const BlockComponents = {
  [BlockTypes.TEXT]: [TextBlock, TextInputBlock]
}

const Block = styled(({ id, type, children: value, updateValue, isEditor }) => {
  const [BlockVisual, BlockEditor] = BlockComponents[type]
  if(isEditor){
    return (
      <BlockEditor updateValue={updateValue}>{value}</BlockEditor>
    )
  }
  return (
    <BlockVisual>{value}</BlockVisual>
  )
})``

export default Block
