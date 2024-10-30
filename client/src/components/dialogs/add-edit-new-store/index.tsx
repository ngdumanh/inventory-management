'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'

// Component Imports
import DialogCloseButton from '../DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'

type EditStoreInfoData = {
  firstName?: string
  lastName?: string
  userName?: string
  billingEmail?: string
  status?: string
  taxId?: string
  contact?: string
  language?: string[]
  country?: string
  useAsBillingAddress?: boolean
}

type EditStoreInfoProps = {
  open: boolean
  setOpen: (open: boolean) => void
  data?: EditStoreInfoData
}

const initialData: EditStoreInfoProps['data'] = {
  firstName: 'Oliver',
  lastName: 'Queen',
  userName: 'oliverQueen',
  billingEmail: 'oliverQueen@gmail.com',
  status: 'active',
  taxId: 'Tax-8894',
  contact: '+ 1 609 933 4422',
  language: ['English'],
  country: 'US',
  useAsBillingAddress: true
}

const status = ['Status', 'Active', 'Inactive', 'Suspended']

const languages = ['English', 'Spanish', 'French', 'German', 'Hindi']

const countries = ['Select Country', 'France', 'Russia', 'China', 'UK', 'US']

const EditStoreInfo = ({ open, setOpen, data }: EditStoreInfoProps) => {
  // States
  const [userData, setStoreInfo] = useState<EditStoreInfoProps['data']>(data || initialData)

  const handleClose = () => {
    setOpen(false)
    setStoreInfo(data || initialData)
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth='md'
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Thêm - Chỉnh Sửa Store
        <Typography component='span' className='flex flex-col text-center'>
          Cập nhật thông tin Store của bạn
        </Typography>
      </DialogTitle>
      <form onSubmit={e => e.preventDefault()}>
        <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='Tên store'
                placeholder='JohnDoe'
                onChange={e => setStoreInfo({ ...userData, userName: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='FriendlyName'
                placeholder='ToniPhamLX'
                onChange={e => setStoreInfo({ ...userData, userName: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='Gói Thuê Store'
                placeholder='Free 5 days'
                onChange={e => setStoreInfo({ ...userData, userName: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='TiktokShop Code'
                placeholder='123456'
                onChange={e => setStoreInfo({ ...userData, userName: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='Link First Authorized'
                placeholder='https://services.tiktokshops.us/open/authorize?service_id=7366132192579667755'
                onChange={e => setStoreInfo({ ...userData, userName: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='Code Authorized'
                placeholder='123456'
                onChange={e => setStoreInfo({ ...userData, userName: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='TikTokShop Id'
                placeholder='123456'
                onChange={e => setStoreInfo({ ...userData, userName: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='Cipher'
                placeholder='123456'
                onChange={e => setStoreInfo({ ...userData, userName: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='AccessToken'
                placeholder='123456'
                onChange={e => setStoreInfo({ ...userData, userName: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='RefreshToken'
                placeholder='123456'
                onChange={e => setStoreInfo({ ...userData, userName: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='Miêu tả store'
                placeholder='ToniPhamLX Store'
                onChange={e => setStoreInfo({ ...userData, userName: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' onClick={handleClose} type='submit'>
            Submit
          </Button>
          <Button variant='tonal' color='secondary' type='reset' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditStoreInfo
