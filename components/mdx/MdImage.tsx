import Image from "next/image"
import React from "react"
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogImage,
  MorphingDialogClose,
  MorphingDialogContainer,
} from "../motion-primitives/morphing-dialog"
import { cn } from "@/lib/utils"

const MdImage = ({
  src,
  alt,
  expandedWidth = 500,
  expandedHeight = 500,
  triggerClassName = "",
  className = "",
  ...restProps
}: {
  src: string
  alt: string
  expandedWidth?: number
  expandedHeight?: number
  triggerClassName?: string
  className?: string
  [key: string]: any // For additional props
}) => {
  return (
    <MorphingDialog
      transition={{
        type: "spring",
        bounce: 0.05,
        duration: 0.25,
      }}
    >
      <MorphingDialogTrigger
        style={{
          borderRadius: "12px",
        }}
        className={`w-fit cursor-zoom-in ${triggerClassName}`}
      >
        <MorphingDialogImage
          src={src}
          alt={alt}
          className={cn(`h-48 w-48`, className)}
          {...restProps}
        />
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent
          style={{
            borderRadius: "24px",
            width: `${expandedWidth}px`,
            height: `${expandedHeight}px`,
            maxWidth: "95vw",
            maxHeight: "90vh",
          }}
        >
          <MorphingDialogImage
            src={src}
            alt={alt}
            className={`h-full w-full `}
            {...restProps}
          />
          <MorphingDialogClose className="text-zinc-900 dark:text-white cursor-pointer" />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

export default MdImage
