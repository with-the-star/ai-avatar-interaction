'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoaderCircle } from 'lucide-react'
import { attachFiles, createAssistant, createFile, createThread, createVectorStore } from '@/lib/actions'
import { useToast } from '@/lib/hooks/use-toast'
import Dropzone from '@/components/dropzone'

export default function Page() {
  const [opened, setOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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

  return (
    <div className="flex items-center justify-center py-10">
      <div className="absolute top-10 right-10">
        <button
          onClick={() => {
            setOpened(true)
          }}
          className="px-5 py-2 border border-white"
        >
          Start
        </button>
      </div>
      <div className="text-gray-700 text-white bg-black bg-opacity-95 rounded-2xl">
        {opened ? (
          isLoading ? (
            <LoaderCircle className="size-24 animate-spin" />
          ) : (
            <div className="p-10 space-y-5">
              <h3 className='text-2xl font-semibold'>Welcome</h3>
              <p className="">Get started by uploading your documents here.</p>
              <Dropzone onLoad={handleFilesLoaded} />
              <p>File Type : PDF, XLSX, TXT, WORD</p>
            </div>
          )
        ) : null}
      </div>
    </div>
  )
}
