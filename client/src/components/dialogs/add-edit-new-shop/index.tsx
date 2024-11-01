'use client'

// React Imports
import { useEffect, useState } from 'react'

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
import { CreateShopRequest, ShopResponse } from '@/types'
import { createShop } from '@/services/apiServices'

type EditShopInfoProps = {
  open: boolean
  setOpen: (open: boolean) => void
  data: ShopResponse
  auth_code_link: string
}

const EditShopInfo = ({ open, setOpen, data }: EditShopInfoProps) => {
  // States
  const [userData, setShopInfo] = useState<EditShopInfoProps['data']>(data)
  const [authCodeLink, setAuthCodeLink] = useState<string>('auth_code_link')
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState<boolean>(false) // State for success status

  useEffect(() => {
    setShopInfo(userData)
    setAuthCodeLink(authCodeLink)
  }, [data])

  const handleClose = () => {
    setOpen(false)
    //setShopInfo(data)
    //setAuthCodeLink(authCodeLink)
    setError(null)
    setIsSuccess(false) // Reset success status on close
  }

  const handleSave = async () => {
    // Validate data
    if (
      !userData.shop_name ||
      !userData.shop_id ||
      !userData.shop_code ||
      !userData.access_token ||
      !authCodeLink ||
      !userData.api_service_id
    ) {
      setError('All fields are required.')
      return
    }

    try {
      // Extract code from auth_code_link
      const authCode = extractCodeFromUrl(authCodeLink)
      if (!authCode) {
        setError('Invalid auth_code_link.')
        return
      }

      // Create request payload
      const requestData: CreateShopRequest = {
        api_service_id: userData.api_service_id,
        auth_code_link: authCodeLink,
        shop_name: userData.shop_name,
        shop_description: userData.shop_description,
        subscription_id: userData.subscription_id
      }

      // Call create-shop POST endpoint
      const responseData = await createShop(requestData)

      console.log('Response data:', responseData)
      setShopInfo(responseData)

      setIsSuccess(true) // Update success status

      //setOpen(false)
    } catch (error) {
      console.error('Error creating shop:', error)
      setError('Failed to create shop.')
    }
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
          {isSuccess && <Typography color='green'>Shop created successfully!</Typography>}
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
                onChange={e => setAuthCodeLink(e.target.value)}
                maxLength={300}
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
                maxLength={30}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='Miêu tả shop'
                placeholder='ToniPhamLX Shop'
                onChange={e => setShopInfo({ ...userData, shop_description: e.target.value })}
                maxLength={100}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='Gói Thuê'
                placeholder='Free 5 days'
                defaultValue={'Free 5 days'}
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
          {!isSuccess && (
            <Button variant='contained' onClick={handleSave} type='submit'>
              Submit
            </Button>
          )}

          <Button variant='tonal' color='secondary' type='reset' onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditShopInfo
function extractCodeFromUrl(authCodeLink: string): string | null {
  try {
    const url = new URL(authCodeLink)
    const code = url.searchParams.get('code')
    return code
  } catch (error) {
    console.error('Invalid URL:', error)
    return null
  }
}
