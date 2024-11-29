'use client'

import { useCallback, useState } from 'react'
import { CornerDownLeft, LoaderCircle } from 'lucide-react'
import Textarea from 'react-textarea-autosize'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export function ChatPrompt({ isLoading, onSubmit, handleQuiz }: { isLoading: boolean; onSubmit: (input: string) => void ;handleQuiz: () => void }) {
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
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="flex flex-col max-h-60  border bg-black bg-opacity-50 rounded-2xl p-2 gap-1">
        <Textarea
            tabIndex={0}
            onKeyDown={onKeyDown}
            placeholder="Send a message."
            className="bg-transparent min-h-[54px] w-full resize-none p-4 pr-[40px] focus-within:outline-none"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            name="message"
            rows={1}
            value={input}
            onChange={handleInputChange}
        />
          
          <div className='flex justify-between'>
            <button className='rounded-full px-4 py-2 hover:bg-black' type="submit" disabled={isLoading || input?.trim() === ''}>              {isLoading ? <LoaderCircle className="size-6 animate-spin" /> : 'Send'}
            </button>
            <button className='rounded-full px-4 py-2 hover:bg-black' onClick={handleQuiz}>{isLoading ? <LoaderCircle className="size-6 animate-spin" /> : 'Quiz'}</button>
          </div>
      </div>
    </form>
  )
}
