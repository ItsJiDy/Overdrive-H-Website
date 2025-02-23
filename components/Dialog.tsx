"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface CustomAlertDialogProps {
  title: string
  description: string
  isOpen: boolean
  onClose: () => void
}

export function CustomAlertDialog({ title, description, isOpen, onClose }: CustomAlertDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex justify-center">
          <Button onClick={onClose} className="bg-blue-500 hover:bg-blue-600 text-white">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}