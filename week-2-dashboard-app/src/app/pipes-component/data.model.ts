export interface DUMMY {
  name: string,
  createdAt: string,
  status: string
}

export const dummyData: DUMMY[] = [
  {
    name: 'mumbai-in',
    createdAt: '03/08/2022',
    status: 'online',
  },
  {
    name: 'ny-us',
    createdAt: '23/01/2004',
    status: 'offline',
  },
  {
    name: 'us-east',
    createdAt: '10/04/2012',
    status: 'offline',
  },
  {
    name: 'jpn-main',
    createdAt: '08/12/2021',
    status: 'online',
  },
  {
    name: 'korea-east',
    createdAt: '18/01/2010',
    status: 'online',
  }
]
