// MUI Imports
import Grid from '@mui/material/Grid'

import ShopDataTable from '@/views/react-table/ShopDataTable'

const Tables = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ShopDataTable />
      </Grid>
    </Grid>
  )
}

export default Tables
