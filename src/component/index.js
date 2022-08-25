import { useState, useEffect } from 'react'
import { getUser } from '../utils/request'
import { Table, Col, Row, Input, Typography, Select, Button } from 'antd';
import columns from '../utils/columns';
import { useSelector, useDispatch } from 'react-redux';
import { addUsers, changeUsers, toggleLoading } from '../redux/users'

const { Option } = Select
const {Search} = Input

function Component() {
  const stateRedux = useSelector(state => state)
  const dispatch = useDispatch()
  const { loading, users } = stateRedux
  const [state, setState] = useState({
    page: 1,
    gender: '',
    name: '',
    pageSize: 5,
    currentPage: 1,
    filteredInfo: null,
  })
  const { page, gender, name, currentPage } = state
  // const sortedInfo = {
  //   order: sortOrder,
  //   columnKey: sortBy
  // }
  // setState
  const setNewState = (field, value) => setState((currentState) => ({
    ...currentState,
    [field]: value
  }))

  const resetFilter = () => setState((currentState) => ({
    ...currentState,
    gender: '',
    name: '',
    sortOrder: '',
  }))

  const getAllUser = async () => {
    const param = {
      page,
      gender,
      keyword: name,
    }
    const filterObj = Object.entries(param).filter(([_, value]) => value);
    const arrToObj = Object.fromEntries(filterObj);
    dispatch(toggleLoading())
    const response = await getUser(arrToObj)
    dispatch(changeUsers(response.results))
    dispatch(toggleLoading())
    setNewState('currentPage', 1)
  }

  const fetchMore = async () => {
    const param = {
      page,
      gender,
      keyword: name,
    }
    const filterObj = Object.entries(param).filter(([_, value]) => value);
    const arrToObj = Object.fromEntries(filterObj);
    dispatch(toggleLoading())
    const response = await getUser(arrToObj)
    dispatch(addUsers(response.results))
    dispatch(toggleLoading())
    setNewState('page', page + 1)
  }

  const onChange = (pagination, filters, sorter, extra) => {
    const { action, currentDataSource } = extra
    const { current } = pagination
    // Pagination
    if (action === 'paginate' && (currentDataSource.length / 5 === current)) {
      fetchMore()
    }
  };

  useEffect(() => {
    getAllUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, gender])

  return (
    <Col style={{ padding: 5 }}>
      <Row align="bottom" gutter={[16, 16]} wrap="wrap" style={{ padding: 5 }}>
        <Col className="gutter-row">
          <Typography>Search</Typography>
          <Search placeholder="search ..." onChange={(e) => setNewState('name', e.target.value)} value={name} enterButton />
        </Col>
        <Col className="gutter-row">
          <Typography>Gender</Typography>
          <Select defaultValue="all" onChange={(value) => setNewState('gender', value)} value={gender}>
            <Option value=''>All</Option>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Col>
        <Col>
          <Button onClick={() => resetFilter()}>Reset Filter</Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={users}
            rowKey={(record) => record.login.uuid}
            loading={loading}
            pagination={{
              pageSize: 5,
            }}
            onChange={onChange}
          />
        </Col>
      </Row>
    </Col>
  )
}

export default Component