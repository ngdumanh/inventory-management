// MUI Imports
import Grid from '@mui/material/Grid'

import StoreDataTable from '@views/react-table/StoreDataTable'

const Tables = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <StoreDataTable />
      </Grid>
    </Grid>
  )
}

export default Tables
