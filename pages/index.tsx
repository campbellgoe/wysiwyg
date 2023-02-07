import Head from 'next/head'
import { useState } from 'react'
import styled from 'styled-components'
import Block from '../components/Block'
import { BlockSources, BlockTypes } from '../config/blocks'



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

const BlockSourceCard = styled(({ className = '', title, children }) => {
  return (
    <div className={className} title='Drag and drop me into the WYSIWYG editor'>
      <h5>{title}</h5>
      {children}
    </div>
  )
})`
background: black;
color: white;
border-radius: 8px;
padding: .5rem 1rem;
max-width: 400px;
h5 {
  margin: 0.5rem 0;
}
`

const BlocksSource = () => {
  const blocks = BlockSources
  return <div>
    {blocks.map(({ type, description }) => {
      return (
        <BlockSourceCard
          className='BlockSourceCard'
          key={type}
          title={type}
        >
          <p>
            {description}
          </p>
        </BlockSourceCard>
      )
    })}
  </div>
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
      <ModeSwitcher isEditor={isEditor} setIsEditor={setIsEditor}/>
      <details><summary>Editor</summary>
        <BlocksSource/>
        {isEditor && <BlocksContainer blocks={exampleBlocks} setBlocks={setExampleBlocks} isEditor={isEditor} />}
      </details>
      {!isEditor && <BlocksContainer blocks={exampleBlocks} setBlocks={setExampleBlocks} isEditor={isEditor} />}
    </>
  )
}
