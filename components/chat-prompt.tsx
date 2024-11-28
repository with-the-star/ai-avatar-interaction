'use client'

import { useCallback, useState } from 'react'
import { CornerDownLeft, LoaderCircle, Paperclip } from 'lucide-react'
import Textarea from 'react-textarea-autosize'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export function ChatPrompt({ isLoading, onSubmit }: { isLoading: boolean; onSubmit: (input: string) => void }) {
  const [input, setInput] = useState('')
  const { formRef, onKeyDown } = useEnterSubmit(isLoading)

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input?.trim()) return

    onSubmit(input)
    setInput('')
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-row">
      <div className="relative flex max-h-[300px] w-full grow overflow-hidden items-center gap-1">
        <div>
          <Button type="submit" size="icon" className="size-10 rounded-xl bg-[#ff617f]">
            <Paperclip className="size-4 " />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
        <Textarea
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a message."
          className="min-h-[42px] max-h-[300px] w-full resize-none bg-white text-gray-800 px-4 py-2 focus-within:outline-none  sm:rounded-2xl shadow-2xl"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          onChange={handleInputChange}
        />
        <div className="">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="submit" size="icon" className="size-10 rounded-xl bg-[#ff617f]" disabled={isLoading || input?.trim() === ''}>
                {isLoading ? <LoaderCircle className="size-6 animate-spin" /> : <CornerDownLeft className="size-4 " />}
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}
