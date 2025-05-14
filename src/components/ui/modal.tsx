import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

function Modal({ className, children, ...props }: React.ComponentProps<typeof Dialog.Root>) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 bg-black/50 z-50",
            className
          )}
        />
        <Dialog.Content
          className={cn(
            "fixed inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg rounded-xl bg-background p-6 shadow-xl",
            className
          )}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function ModalHeader({ className, children, ...props }: React.ComponentProps<typeof CardHeader>) {
  return (
    <CardHeader className={cn("border-b pb-4", className)} {...props}>
      {children}
    </CardHeader>
  )
}

function ModalTitle({ className, children, ...props }: React.ComponentProps<typeof CardTitle>) {
  return (
    <CardTitle className={cn("text-lg font-semibold", className)} {...props}>
      {children}
    </CardTitle>
  )
}

function ModalContent({ className, children, ...props }: React.ComponentProps<typeof CardContent>) {
  return (
    <CardContent className={cn("pt-4", className)} {...props}>
      {children}
    </CardContent>
  )
}

function ModalFooter({ className, children, ...props }: React.ComponentProps<typeof CardFooter>) {
  return (
    <CardFooter className={cn("flex justify-end pt-4", className)} {...props}>
      {children}
    </CardFooter>
  )
}

function ModalCloseButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn("ml-2", className)}
      {...props}
    >
      Fechar
    </Button>
  )
}

export { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter, ModalCloseButton }