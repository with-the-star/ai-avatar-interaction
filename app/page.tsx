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
      <div className="absolute right-20 top-20">
        <button
          onClick={() => {
            setOpened(true)
          }}
          className="border border-white px-5 py-2"
        >
          Start
        </button>
      </div>
      <div className="rounded-2xl bg-black/95 text-white">
        {opened ? (
          isLoading ? (
            <LoaderCircle className="size-24 animate-spin" />
          ) : (
            <div className="space-y-5 p-10">
              <h3 className='text-2xl font-semibold'>Welcome</h3>
              <p className="">Get started by uploading your documents here.</p>
              <Dropzone onLoad={handleFilesLoaded} />
              <p>File Type : .doc, .docx, .pdf, .pptx</p>
            </div>
          )
        ) : null}
      </div>
    </div>
  )
}
