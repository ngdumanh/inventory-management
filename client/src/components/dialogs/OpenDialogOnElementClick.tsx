'use client'

// React Imports
import React, { useState } from 'react'
import type { ComponentType } from 'react'
import { Dialog, DialogProps } from '@mui/material'

type OpenDialogOnElementClickProps = {
  element: React.ElementType
  elementProps?: any
  dialog: React.ElementType
  dialogProps?: DialogProps
  dialogData?: any // Add this line to accept dialog data
}

const OpenDialogOnElementClick: React.FC<OpenDialogOnElementClickProps> = ({
  element: Element,
  elementProps,
  dialog: DialogComponent,
  dialogProps,
  dialogData // Add this line to accept dialog data
}) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Element {...elementProps} onClick={handleClick} />
      <Dialog {...dialogProps} open={open} onClose={handleClose}>
        <DialogComponent open={open} setOpen={setOpen} data={dialogData} />
      </Dialog>
    </>
  )
}

export default OpenDialogOnElementClick
