import styled from "styled-components"
import { BlockTypes } from "../config/blocks"

const TextBlock = styled.p`
  padding: 1rem;
`

const TextInputBlock = styled(({ className='', children, updateValue }) => {
  return (
    <input
      className={className+' TextInputBlock'}
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
  display: block;
  width: 400px;
`

const BlockComponents = {
  [BlockTypes.TEXT]: [TextBlock, TextInputBlock]
}

const Block = styled(({ id, type, children: value, updateValue, isEditor }) => {
  const [BlockVisual, BlockEditor] = BlockComponents[type]
  if(isEditor){
    return (
      <BlockEditor className="EditorBlock" updateValue={updateValue}>{value}</BlockEditor>
    )
  }
  return (
    <BlockVisual>{value}</BlockVisual>
  )
})``

export default Block
