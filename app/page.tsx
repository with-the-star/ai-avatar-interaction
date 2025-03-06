'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoaderCircle } from 'lucide-react'
import { attachFiles, createAssistant, createFile, createThread, createVectorStore, removeThread } from '@/lib/actions'
import { useToast } from '@/lib/hooks/use-toast'
import Dropzone from '@/components/dropzone'

interface Thread {
  id: string
  assistantId: string
}

export default function Page() {
  const [opened, setOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const [threads, setThreads] = useState<Thread[]>([])

  useEffect(() => {
    const storedThreads = localStorage.getItem('threads')
    if (storedThreads) {
      setThreads(JSON.parse(storedThreads))
    }
  }, [])
  useEffect(() => {
    localStorage.setItem('threads', JSON.stringify(threads))
  }, [threads])

  async function createChat() {
    setIsLoading(true)

    try {
      const vectorStore = await createVectorStore()
    
      const assistant = await createAssistant(vectorStore.id)
      const thread = await createThread()

      const newThread: Thread = { id: thread.id, assistantId: assistant.id }
      setThreads(prevThreads => [...prevThreads, newThread])

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
  function moveChat(thread: Thread) {
    router.push(`/assistant/${thread.assistantId}/thread/${thread.id}`)
  }

  async function removeChat(threadId: string) {
    const result = await removeThread(threadId)
    setThreads(prevThreads => prevThreads.filter(thread => thread.id !== threadId));
    return result;
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

  return (
    <div className="flex items-center justify-center py-10">
      <div className="absolute top-10 right-10">
        <button
          onClick={createChat}
          className="px-5 py-2 border border-white"
        >
          Start
        </button>
      </div>
      <ul className="list-disc">
          {threads.map(thread => (
            <li key={thread.id} className="flex justify-between items-center">
              <button onClick={() => moveChat(thread)} className="text-blue-500">
                Thread {thread.id}
              </button>
              <button onClick={() => removeChat(thread.id)} className="text-red-500 ml-2">
                Remove
              </button>
            </li>
          ))}
        </ul>
    </div>
  )
}
