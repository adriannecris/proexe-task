import { Layout, PageHeader } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import './App.css'
import { CreateUser, EditUser } from './service/pages/forms'
import UsersPage from './service/pages/tables'
import { useAppDispatch } from './store'
import { fetchUsers } from './store/reducers/UsersReducer'

const SPageHeader = styled(PageHeader)`
  background-color: #68c3a3;
  color: white;
`

const SContent = styled(Content)`
  background-color: #969faf;
  height: 100vh;
  padding: 15px 15px;
`

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <Layout>
      <SPageHeader title="Dashboard - Adrianne Cris Ledesma" />
      <SContent>
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="users/:userId/edit" element={<EditUser />} />
          <Route path="users/create" element={<CreateUser />} />
        </Routes>
      </SContent>
    </Layout>
  )
}

export default App
