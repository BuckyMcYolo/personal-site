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
import { X } from "lucide-react"

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
        <div className="relative duration-0">
          {/* Close button positioned absolutely outside the image */}
          <div className="absolute -top-14 -right-4 z-10 duration-0">
            <MorphingDialogClose className="flex items-center justify-center w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-accent duration-0">
              <X size={18} className="text-foreground" />
            </MorphingDialogClose>
          </div>

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
              className={`h-full w-full`}
              {...restProps}
            />
          </MorphingDialogContent>
        </div>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

export default MdImage
