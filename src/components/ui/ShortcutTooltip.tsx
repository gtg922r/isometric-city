import * as React from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./tooltip"

interface ShortcutTooltipProps {
  children: React.ReactNode
  content: string
  shortcut?: string
}

export function ShortcutTooltip({
  children,
  content,
  shortcut,
}: ShortcutTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <div className="flex items-center gap-2">
          <span>{content}</span>
          {shortcut && <span className="text-xs text-muted-foreground opacity-70">({shortcut})</span>}
        </div>
      </TooltipContent>
    </Tooltip>
  )
}
