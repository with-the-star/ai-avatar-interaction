'use client'

import { useReducer, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoaderCircle } from 'lucide-react'
import { attachFiles, createAssistant, createFile, createThread, createVectorStore } from '@/lib/actions'
import { useToast } from '@/lib/hooks/use-toast'
import Dropzone from '@/components/dropzone'
import { Message } from '@/lib/types'
import { Chat } from '@/components/chat'
import { createMessage, listMessages, runThread } from '@/lib/actions'
import { readStreamableValue } from 'ai/rsc'

interface PageProps {
  params: { assistantId: string; threadId: string }
}

type State = {
  messages: Message[]
  isLoading: boolean
}

type Action =
  | { type: 'ADD_MESSAGE'; message: Message }
  | { type: 'UPDATE_LAST_MESSAGE'; content: string }
  | { type: 'SET_LOADING'; isLoading: boolean }


function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.message] }
    case 'UPDATE_LAST_MESSAGE':
      const updatedMessages = [...state.messages]
      updatedMessages[updatedMessages.length - 1].content = action.content
      return { ...state, messages: updatedMessages }
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading }
    default:
      return state
  }
}

export default function Home({ params }: PageProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [state, dispatch] = useReducer(reducer, {
    messages: [],
    isLoading: false,
  })

  const router = useRouter()
  const { toast } = useToast()

  async function handleFilesLoaded(files: FileList) {
    setIsLoading(true)

    try {
      const fileList = await uploadFiles(files)
      const vectorStore = await createVectorStore()
      await attachFiles(
        vectorStore.id,
        fileList.map(file => file.id),
      )

      const assistant = await createAssistant(vectorStore.id)
      const thread = await createThread()

      router.push(`/assistant/${assistant.id}/thread/${thread.id}`)
    } catch (error) {
      setIsLoading(false)
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem creating your assistant.',
      })
    }
  }

  async function uploadFiles(files: FileList) {
    return await Promise.all(
      Array.from(files).map(file => {
        const formData = new FormData()
        formData.append('file', file)
        return createFile(formData)
      }),
    )
  }

  async function handleSubmit(input: string) {
    const userMessage: Message = {
      content: input,
      role: 'user',
    }
    dispatch({ type: 'ADD_MESSAGE', message: userMessage })
    dispatch({ type: 'SET_LOADING', isLoading: true })

    await createMessage(params.threadId, userMessage)
    const stream = await runThread(params.threadId, params.assistantId)

    dispatch({ type: 'ADD_MESSAGE', message: { role: 'assistant', content: '_Generating response..._' } })
    for await (const v of readStreamableValue(stream)) {
      if (v && v.text !== '') {
        dispatch({ type: 'UPDATE_LAST_MESSAGE', content: v.text })
      }
    }
    dispatch({ type: 'SET_LOADING', isLoading: false })
  }

  return (
    <div className="absolute bottom-0 z-20 w-screen flex overflow-hidden bg-background dark:bg-transparent">
      <Chat messages={state.messages} handleSubmit={handleSubmit} isLoading={state.isLoading} />
    </div>
  )
}
