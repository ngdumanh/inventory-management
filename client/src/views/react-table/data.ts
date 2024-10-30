interface StoreInfoDataType {
  id: number
  avatar: string
  fullName: string
  post: string
  email: string
  city: string
  start_date: string
  salary: number
  age: number
  experience: string
  status: number
  storeExpireTime: string
  storeCreatedTime: string
  scheduledTime: string
  totalOrder: number
  warehouses: { id: number; name: string; defaultStatus: string }[]
}

const data: StoreInfoDataType[] = [
  {
    id: 1,
    avatar: '1.png',
    fullName: "Korrie O'Crevy",
    post: 'Nuclear Power Engineer',
    email: 'kocrevy0@thetimes.co.uk',
    city: 'Krasnosilka',
    start_date: '09/23/2016',
    salary: 23896.35,
    age: 61,
    experience: '1 Year',
    status: 2,
    storeExpireTime: '12/31/2023',
    storeCreatedTime: '01/01/2020',
    scheduledTime: '10:00 AM',
    totalOrder: 150,
    warehouses: [
      { id: 1, name: 'Warehouse A', defaultStatus: 'Active' },
      { id: 2, name: 'Warehouse B', defaultStatus: 'Inactive' }
    ]
  },
  {
    id: 2,
    avatar: '2.png',
    fullName: 'Binh Nguyen',
    post: 'Software Engineer',
    email: 'bnguyen@example.com',
    city: 'Hanoi',
    start_date: '05/15/2018',
    salary: 45000.0,
    age: 30,
    experience: '3 Years',
    status: 1,
    storeExpireTime: '11/30/2023',
    storeCreatedTime: '02/01/2020',
    scheduledTime: '11:00 AM',
    totalOrder: 200,
    warehouses: [
      { id: 3, name: 'Warehouse C', defaultStatus: 'Active' },
      { id: 4, name: 'Warehouse D', defaultStatus: 'Inactive' }
    ]
  },
  {
    id: 3,
    avatar: '3.png',
    fullName: 'Alice Johnson',
    post: 'Data Scientist',
    email: 'alice.johnson@example.com',
    city: 'New York',
    start_date: '07/12/2019',
    salary: 70000.0,
    age: 28,
    experience: '2 Years',
    status: 3,
    storeExpireTime: '10/31/2023',
    storeCreatedTime: '03/01/2020',
    scheduledTime: '09:00 AM',
    totalOrder: 250,
    warehouses: [
      { id: 5, name: 'Warehouse E', defaultStatus: 'Active' },
      { id: 6, name: 'Warehouse F', defaultStatus: 'Inactive' }
    ]
  },
  {
    id: 4,
    avatar: '4.png',
    fullName: 'John Doe',
    post: 'Project Manager',
    email: 'john.doe@example.com',
    city: 'Los Angeles',
    start_date: '01/20/2017',
    salary: 85000.0,
    age: 35,
    experience: '5 Years',
    status: 1,
    storeExpireTime: '09/30/2023',
    storeCreatedTime: '04/01/2020',
    scheduledTime: '08:00 AM',
    totalOrder: 300,
    warehouses: [
      { id: 7, name: 'Warehouse G', defaultStatus: 'Active' },
      { id: 8, name: 'Warehouse H', defaultStatus: 'Inactive' }
    ]
  },
  {
    id: 5,
    avatar: '5.png',
    fullName: 'Jane Smith',
    post: 'Marketing Specialist',
    email: 'jane.smith@example.com',
    city: 'Chicago',
    start_date: '03/15/2020',
    salary: 60000.0,
    age: 29,
    experience: '4 Years',
    status: 2,
    storeExpireTime: '08/31/2023',
    storeCreatedTime: '05/01/2020',
    scheduledTime: '07:00 AM',
    totalOrder: 350,
    warehouses: [
      { id: 9, name: 'Warehouse I', defaultStatus: 'Active' },
      { id: 10, name: 'Warehouse J', defaultStatus: 'Inactive' }
    ]
  },
  {
    id: 6,
    avatar: '6.png',
    fullName: 'Michael Brown',
    post: 'Sales Manager',
    email: 'michael.brown@example.com',
    city: 'Houston',
    start_date: '06/10/2018',
    salary: 75000.0,
    age: 40,
    experience: '6 Years',
    status: 3,
    storeExpireTime: '11/01/2024',
    storeCreatedTime: '06/01/2020',
    scheduledTime: '06:00 AM',
    totalOrder: 400,
    warehouses: [
      { id: 11, name: 'Warehouse K', defaultStatus: 'Active' },
      { id: 12, name: 'Warehouse L', defaultStatus: 'Inactive' }
    ]
  },
  {
    id: 7,
    avatar: '7.png',
    fullName: 'Emily Davis',
    post: 'HR Manager',
    email: 'emily.davis@example.com',
    city: 'Phoenix',
    start_date: '08/25/2019',
    salary: 65000.0,
    age: 32,
    experience: '3 Years',
    status: 1,
    storeExpireTime: '06/30/2026',
    storeCreatedTime: '07/01/2020',
    scheduledTime: '05:00 AM',
    totalOrder: 450,
    warehouses: [
      { id: 13, name: 'Warehouse M', defaultStatus: 'Active' },
      { id: 14, name: 'Warehouse N', defaultStatus: 'Inactive' }
    ]
  },
  {
    id: 8,
    avatar: '8.png',
    fullName: 'David Wilson',
    post: 'IT Support',
    email: 'david.wilson@example.com',
    city: 'Philadelphia',
    start_date: '11/05/2020',
    salary: 55000.0,
    age: 27,
    experience: '1 Year',
    status: 2,
    storeExpireTime: '05/31/2023',
    storeCreatedTime: '08/01/2020',
    scheduledTime: '04:00 AM',
    totalOrder: 500,
    warehouses: [
      { id: 15, name: 'Warehouse O', defaultStatus: 'Active' },
      { id: 16, name: 'Warehouse P', defaultStatus: 'Inactive' }
    ]
  },
  {
    id: 9,
    avatar: '9.png',
    fullName: 'Sophia Martinez',
    post: 'Graphic Designer',
    email: 'sophia.martinez@example.com',
    city: 'San Antonio',
    start_date: '02/14/2021',
    salary: 50000.0,
    age: 26,
    experience: '2 Years',
    status: 3,
    storeExpireTime: '04/30/2023',
    storeCreatedTime: '09/01/2020',
    scheduledTime: '03:00 AM',
    totalOrder: 550,
    warehouses: [
      { id: 17, name: 'Warehouse Q', defaultStatus: 'Active' },
      { id: 18, name: 'Warehouse R', defaultStatus: 'Inactive' }
    ]
  },
  {
    id: 10,
    avatar: '10.png',
    fullName: 'Olivia Taylor',
    post: 'Content Writer',
    email: 'olivia.taylor@example.com',
    city: 'San Diego',
    start_date: '04/22/2021',
    salary: 48000.0,
    age: 25,
    experience: '1 Year',
    status: 1,
    storeExpireTime: '03/31/2025',
    storeCreatedTime: '10/01/2020',
    scheduledTime: '02:00 AM',
    totalOrder: 600,
    warehouses: [
      { id: 19, name: 'Warehouse S', defaultStatus: 'Active' },
      { id: 20, name: 'Warehouse T', defaultStatus: 'Inactive' }
    ]
  },
  // 30 more seed data entries
  ...Array.from({ length: 100 }, (_, i) => ({
    id: 10 + i,
    avatar: `${8 + i}.png`,
    fullName: `User ${8 + i}`,
    post: 'Employee',
    email: `user${8 + i}@example.com`,
    city: 'City',
    start_date: '01/01/2020',
    salary: 50000.0 + i * 1000,
    age: 25 + i,
    experience: `${i + 1} Years`,
    status: i % 2 === 0 ? 1 : 0,
    storeExpireTime: `11/${String((i % 30) + 1).padStart(2, '0')}/2024`,
    storeCreatedTime: '01/01/2020',
    scheduledTime: '08:00 AM',
    totalOrder: 100 + i * 10,
    warehouses: [
      { id: 15 + i * 2, name: `Warehouse ${String.fromCharCode(65 + i)}`, defaultStatus: 'Active' },
      { id: 16 + i * 2, name: `Warehouse ${String.fromCharCode(66 + i)}`, defaultStatus: 'Inactive' }
    ]
  }))
]

export type DataFormatType = {
  Store: string
  ProductInfo: string
  MoreBonusInfo: string
  Warehouse: string
  Status: string
}

// Helper function to calculate the difference in days
const calculateDaysRemaining = (expireTime: string): number => {
  const currentDate = new Date()
  const expireDate = new Date(expireTime)
  const timeDiff = expireDate.getTime() - currentDate.getTime()
  return Math.ceil(timeDiff / (1000 * 3600 * 24))
}

// Create data1 based on data
const data1: DataFormatType[] = data.map(item => {
  const daysRemaining = calculateDaysRemaining(item.storeExpireTime)
  const expireTimeColor = daysRemaining <= 3 ? 'red' : 'green'
  const storeExpireTimeStyled = `<span style="color: ${expireTimeColor};">${item.storeExpireTime} (${daysRemaining} days remaining)</span>`

  return {
    Store: `${item.fullName}<br>${item.email}<br>${item.post}`,
    ProductInfo: `Total: 100<br>Live: 80<br>Pending: 10<br>Rejected: 5<br>Frozen: 3<br>Sync Time: ${new Date().toLocaleString()}`,
    MoreBonusInfo: `Store Expire Time: ${storeExpireTimeStyled}<br>Store Created Time: ${item.storeCreatedTime}<br>Scheduled Time: ${item.scheduledTime}<br>Total Order: ${item.totalOrder}`,
    Warehouse: item.warehouses
      .map(warehouse => `ID: ${warehouse.id}, Name: ${warehouse.name}, Status: ${warehouse.defaultStatus}`)
      .join('<br>'),
    Status:
      item.status === 1
        ? '<span style="color: green; font-weight: bold;">Active</span>'
        : '<span style="color: red; font-weight: bold;">Deactived</span>'
  }
})

export default data1
