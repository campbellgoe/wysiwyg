import Head from 'next/head'
import { useState } from 'react'
import Block from '../components/Block'
import { BlockTypes } from '../config/blocks'



const BlocksContainer = ({ blocks, setBlocks , isEditor }) => {
  return <div>
    {blocks.map(({ id, type, value }, index) => {
      return <Block
        key={id}
        id={id}
        type={type}
        updateValue={newValue => {
          console.log('new value', newValue, 'for block', blocks[index])
          setBlocks(blocks => {
            const newBlocks = [...blocks]
            newBlocks[index].value = newValue
            return newBlocks
          })
        }}
        isEditor={isEditor}
        >{value}</Block>
    })}
  </div>
}

const ModeSwitcher = ({ isEditor, setIsEditor }) => {
  return (
    <div>
      <button onClick={() => {
        setIsEditor(isEditor => !isEditor)
      }}>Switch to {isEditor ? 'Preview' : 'Edit'} mode</button>
    </div>
  )
}

export default function Home() {
  const [isEditor, setIsEditor] = useState(true)
  const [exampleBlocks, setExampleBlocks] = useState([
    { id: 0, type: BlockTypes.TEXT, value: "This is some text." },
    { id: 1, type: BlockTypes.TEXT, value: "Some other text." },
    { id: 2, type: BlockTypes.TEXT, value: "The quick brown fox jumped over the lazy dog." }
  ])
  return (
    <>
      <Head>
        <title>WYSIWYG</title>
        <meta name="description" content="WYSIWYG editor/viewer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BlocksContainer blocks={exampleBlocks} setBlocks={setExampleBlocks} isEditor={isEditor} />
      <ModeSwitcher isEditor={isEditor} setIsEditor={setIsEditor}/>
    </>
  )
}
