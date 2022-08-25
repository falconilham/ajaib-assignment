import moment from 'moment'

const columns = [
  {
    title: 'Username',
    dataIndex: ['login', 'username'],
    key: 'login.username',
    sorter: (a, b) => a.login.username.localeCompare(b.login.username),
  },
  {
    title: 'Name',
    dataIndex: ['name', 'first'],
    key: 'name',
    sorter: (a, b) => a.name.first.localeCompare(b.name.first),
    render: (_, record) => `${record.name.first} ${record.name.last}`
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    sorter: (a, b) => a.email.localeCompare(b.email),
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    width: '120px',
    filters: [
      {
        text: 'Male',
        value: 'male',
      },
      {
        text: 'Female',
        value: 'female',
      },
    ],
    sorter: (a, b) => a.gender.localeCompare(b.gender),
    onFilter: (value, record) => record.gender === value,
  },
  {
    title: 'Registered Date',
    dataIndex: ['registered', 'date'],
    key: 'registered',
    render: (record) => moment(record).format('YYYY-MM-DD HH:mm'),
    sorter: (a, b) => moment(a.registered.date) - moment(b.registered.date),
  }
]

export default columns