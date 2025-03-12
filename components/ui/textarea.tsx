import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const textareaVariants = cva(
  "flex w-full rounded-md text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 scrollbar-thin scrollbar-thumb-neutral-400 scrollbar-track-neutral-100 dark:scrollbar-thumb-neutral-600 dark:scrollbar-track-neutral-900 hover:scrollbar-thumb-neutral-500 dark:hover:scrollbar-thumb-neutral-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar resize-none",
  {
    variants: {
      variant: {
        default:
          "border border-input dark:border-neutral-700 bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
        filled:
          "resize-none border-0 ring-0 outline-0 p-3 shadow-none focus-visible:ring-0 focus:border-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:ring-offset-transparent dark:bg-neutral-900 bg-neutral-100",
        outline:
          "border border-input bg-transparent hover:bg-transparent hover:text-accent-foreground p-2",
      },
      size: {
        default: "min-h-[80px]",
        sm: "min-h-[60px] text-xs",
        lg: "min-h-[110px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  error?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          textareaVariants({ variant, size, className }),
          error && "border-red-500 border outline-red-500"
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
