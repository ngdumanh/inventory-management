'use client'

// React Imports
import { useEffect, useMemo, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import TablePagination from '@mui/material/TablePagination'
import type { TextFieldProps } from '@mui/material/TextField'

// Third-party Imports
import classnames from 'classnames'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper
} from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'
import type { Column, Table, ColumnFiltersState, FilterFn, ColumnDef } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Type Imports
import type { DataFormatType } from './data'

// Component Imports
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'

// Icon Imports
import ChevronRight from '@menu/svg/ChevronRight'

// Style Imports
import styles from '@core/styles/table.module.css'

// Data Imports
import defaultData from './data'
import { Button, IconButton } from '@mui/material'
import OptionMenu from '@/@core/components/option-menu'
import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnElementClick'
import EditShopInfo from '@/components/dialogs/add-edit-new-shop'
import { ShopResponse } from '@/types'
import { getServiceIds } from '@/services/apiServices' // Adjust the import path as needed
import { useSession } from 'next-auth/react'

// Column Definitions
const columnHelper = createColumnHelper<DataFormatType>()

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

// A debounced input react component
const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & TextFieldProps) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

const Filter = ({ column, table }: { column: Column<any, unknown>; table: Table<any> }) => {
  // Vars
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === 'number' ? (
    <div className='flex gap-x-2'>
      <CustomTextField
        fullWidth
        type='number'
        sx={{ minInlineSize: 100, maxInlineSize: 125 }}
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={e => column.setFilterValue((old: [number, number]) => [e.target.value, old?.[1]])}
        placeholder={`Min ${column.getFacetedMinMaxValues()?.[0] ? `(${column.getFacetedMinMaxValues()?.[0]})` : ''}`}
      />
      <CustomTextField
        fullWidth
        type='number'
        sx={{ minInlineSize: 100, maxInlineSize: 125 }}
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={e => column.setFilterValue((old: [number, number]) => [old?.[0], e.target.value])}
        placeholder={`Max ${column.getFacetedMinMaxValues()?.[1] ? `(${column.getFacetedMinMaxValues()?.[1]})` : ''}`}
      />
    </div>
  ) : (
    <CustomTextField
      fullWidth
      sx={{ minInlineSize: 100 }}
      value={(columnFilterValue ?? '') as string}
      onChange={e => column.setFilterValue(e.target.value)}
      placeholder='Search...'
    />
  )
}

const ShopDataTable = () => {
  // States
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [shopListData, setShopListData] = useState<DataFormatType[]>(() => defaultData)

  // create default response shop data
  const [shopEditData, setShopEditData] = useState<ShopResponse>({
    shop_id: 'uuid',
    shop_name: 'Sample Shop',
    shop_code: 'SHOP123',
    access_token: 'access_token',
    access_token_expire_in: '',
    user_id: 1,
    marketplace_id: 1,
    api_service_id: 'default_service_id',
    subscription_start_date: '',
    subscription_expire_date: '',
    refresh_token: 'refresh_token',
    refresh_token_expire_in: '',
    seller_base_region: 'US',
    shop_cipher: 'shop_cipher',
    subscription_id: 1,
    shop_description: ''
  })

  const { data: session, status } = useSession() // Get session data from NextAuth

  // Hooks
  const columns = useMemo<ColumnDef<DataFormatType, any>[]>(
    () => [
      {
        accessorKey: 'Shop',
        cell: ({ row: { original } }) => (
          <div>
            <div dangerouslySetInnerHTML={{ __html: original.Shop }} />
            <div className='flex gap-2'>
              <Button variant='contained' size='small'>
                Gia Hạn Token
              </Button>
              <Button variant='contained' size='small'>
                Sync Order
              </Button>
              <Button variant='contained' size='small'>
                Sync Payout
              </Button>
            </div>
          </div>
        ),
        header: 'SHOP'
      },
      {
        accessorKey: 'ProductInfo',
        cell: ({ row: { original } }) => <div dangerouslySetInnerHTML={{ __html: original.ProductInfo }} />,
        header: 'PRODUCT INFO'
      },
      columnHelper.accessor('MoreBonusInfo', {
        cell: ({
          row: {
            original: { MoreBonusInfo }
          }
        }) => <div dangerouslySetInnerHTML={{ __html: MoreBonusInfo }} />,
        header: 'MORE BONUS INFO'
      }),
      columnHelper.accessor('Warehouse', {
        cell: ({
          row: {
            original: { Warehouse }
          }
        }) => (
          <div>
            <div dangerouslySetInnerHTML={{ __html: Warehouse }} />
            <div style={{ display: 'block', flexDirection: 'column', alignItems: 'center' }}>
              <Button variant='contained' size={'small'}>
                Sync Warehouse
              </Button>
            </div>
          </div>
        ),
        header: 'WAREHOUSE'
      }),
      columnHelper.accessor('Status', {
        cell: ({
          row: {
            original: { Status }
          }
        }) => <div dangerouslySetInnerHTML={{ __html: Status }} />,
        header: 'STATUS'
      }),
      // New column with 3 empty buttons
      {
        id: 'actions',
        header: 'ACTIONS',
        cell: () => (
          <div>
            <IconButton>
              <i className='tabler-edit text-textSecondary' />
            </IconButton>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                { text: 'Download', icon: 'tabler-download' },
                {
                  text: 'Delete',
                  icon: 'tabler-trash',
                  menuItemProps: { onClick: () => console.log('Delete') }
                },
                { text: 'Duplicate', icon: 'tabler-copy' }
              ]}
            />
          </div>
        )
      }
    ],
    []
  )

  const table = useReactTable({
    data: shopListData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      columnFilters,
      globalFilter
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ id: 'fullName', desc: false }])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().columnFilters[0]?.id])

  const buttonProps = {
    className: 'max-sm:is-full is-auto',
    startIcon: <i className='tabler-plus' />,
    variant: 'contained',
    children: 'Add Shop'
  }

  //get service_id from API apiservices
  useEffect(() => {
    const fetchServiceId = async () => {
      try {
        if (status === 'authenticated') {
          console.log('Session: status ', status)
          console.log('Session:', session)

          const serviceIds = await getServiceIds()
          if (serviceIds.length > 0) {
            setShopEditData(prevData => ({
              ...prevData,
              api_service_id: serviceIds[0].service_id
            }))
            //setData(defaultData) // Reset data to defaultData
          }
        }
      } catch (error) {
        console.error('Error fetching service_id:', error)
      }
    }

    fetchServiceId()
  }, [status, session])

  return (
    <Card>
      <CardHeader
        title='THỐNG KÊ SHOP'
        // ADD SHOP BUTTON
        action={
          <div className='flex gap-2'>
            <OpenDialogOnElementClick
              element={Button}
              elementProps={buttonProps}
              dialog={EditShopInfo}
              dialogData={shopEditData}
            />

            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search all columns...'
            />
          </div>
        }
      />

      <div className='overflow-x-auto'>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <ChevronRight fontSize='1.25rem' className='-rotate-90' />,
                              desc: <ChevronRight fontSize='1.25rem' className='rotate-90' />
                            }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                          </div>
                          {header.column.getCanFilter() && <Filter column={header.column} table={table} />}
                        </>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          {table.getFilteredRowModel().rows.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  No data available
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table.getRowModel().rows.map(row => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => {
                      return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    })}
                  </tr>
                )
              })}
            </tbody>
          )}
        </table>
      </div>

      <TablePagination
        component={() => <TablePaginationComponent table={table} />}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
      />
    </Card>
  )
}

export default ShopDataTable
