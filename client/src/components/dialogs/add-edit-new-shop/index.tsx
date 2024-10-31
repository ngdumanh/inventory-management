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
import { EditShopInfoData } from '@/types'

type EditShopInfoProps = {
  open: boolean
  setOpen: (open: boolean) => void
  data: EditShopInfoData
}

const initialData: EditShopInfoData = {
  auth_code_link: '',
  shop_id: 'uuid',
  shop_name: 'Sample Shop',
  shop_code: 'SHOP123',
  access_token: 'access_token',
  access_token_expire_in: new Date(),
  user_id: 1,
  marketplace_id: 1,
  api_service_id: 'api_service_id',
  subscription_start_date: new Date(),
  subscription_expire_date: new Date(),
  refresh_token: 'refresh_token',
  refresh_token_expire_in: new Date(),
  seller_base_region: 'US',
  shop_cipher: 'shop_cipher',
  subscription_id: 1
}

const EditShopInfo = ({ open, setOpen, data }: EditShopInfoProps) => {
  // States
  const [userData, setShopInfo] = useState<EditShopInfoProps['data']>(data || initialData)
  const [error, setError] = useState<string | null>(null)

  const handleClose = () => {
    setOpen(false)
    setShopInfo(data || initialData)
    setError(null)
  }

  const handleSave = () => {
    // Validate data
    if (
      !userData.shop_name ||
      !userData.shop_id ||
      !userData.shop_code ||
      !userData.access_token ||
      !userData.auth_code_link
    ) {
      setError('All fields are required.')
      return
    }

    // Handle save logic here
    console.log('Saved data:', userData)
    setOpen(false)
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
        Thêm - Chỉnh Sửa Shop
        <Typography component='span' className='flex flex-col text-center'>
          Cập nhật thông tin Tiktok Shop của bạn
        </Typography>
      </DialogTitle>
      <form onSubmit={e => e.preventDefault()}>
        <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
          {error && <Typography color='error'>{error}</Typography>}
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='Link First Authorized'
                value={'https://services.tiktokshops.us/open/authorize?service_id=' + userData.api_service_id}
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='Link Code Authorized'
                placeholder='https://www.synclista.com/?app_key=6dt7o5taa35ra&code=TTP_x6MFUQAAAAAIvp7tReYvtnY21CkbT1YGkxn-JmQZrTJN2HVidtm_798OMRjujFnAWYR-K1TubjAiFNaLmCMoalCjJrpkJ76KdNqyjdn8a3MOGG6rYWVW8uFJPHlPx-hMijlotsuxp1HzKeMLCGMiMOtlnRxbTJJP1abTi_GK2TD4n3PiSIAirg&locale=en&shop_region=US'
                onChange={e => setShopInfo({ ...userData, auth_code_link: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='Tên shop'
                placeholder='JohnDoe'
                onChange={e => setShopInfo({ ...userData, shop_name: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='Miêu tả shop'
                placeholder='ToniPhamLX Shop'
                value={'ToniPhamLX Store'}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField fullWidth label='Gói Thuê' placeholder='Free 5 days' defaultValue={'Free 5 days'} />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='Shop Code'
                placeholder='123456'
                value={userData.shop_code}
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='TikTokShop Id'
                placeholder='123456'
                value={userData.shop_id}
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='Cipher'
                placeholder='123456'
                value={userData.shop_cipher}
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='AccessToken'
                placeholder='123456'
                value={userData.access_token}
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='RefreshToken'
                placeholder='123456'
                value={userData.refresh_token}
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' onClick={handleSave} type='submit'>
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

export default EditShopInfo
