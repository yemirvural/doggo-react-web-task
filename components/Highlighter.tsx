interface HighlighterProps {
  text: string
  searchTerm: string
}

export function Highlighter({ text, searchTerm }: HighlighterProps) {
  if (!searchTerm) return <>{text}</>

  const parts = text?.split(new RegExp(`(${searchTerm})`, 'gi'))
    
  return (
    <>
      {parts?.map((part, i) => (
        part.toLowerCase() === searchTerm.toLowerCase() 
          ? <mark key={i} className="bg-yellow-200 rounded-sm">{part}</mark>
          : part
      ))}
    </>
  )
} 