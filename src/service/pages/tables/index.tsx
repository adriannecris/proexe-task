import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store'
import { removeUser } from '../../../store/reducers/UsersReducer'
import { DeleteUserModal } from '../forms'
import UsersTable from './components/UsersTable'

const UsersPage = () => {
  const dispatch = useAppDispatch()
  const { users, isFetching } = useAppSelector(state => state.users)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<{
    id: string
    username: string
  } | null>(null)

  const renderModal = () => {
    if (!selectedUser) return null
    return (
      <DeleteUserModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onOk={() => {
          setIsLoading(true)
          setTimeout(() => {
            dispatch(removeUser(selectedUser.id))
            setSelectedUser(null)
            setIsModalVisible(false)
            setIsLoading(false)
          }, 2000)
        }}
        user={selectedUser}
        isLoading={isLoading}
      />
    )
  }

  const handleDelete = (id: string, username: string) => {
    setSelectedUser({ id, username })
    setIsModalVisible(true)
  }

  return (
    <>
      {renderModal()}
      <UsersTable
        users={users}
        isLoading={isFetching}
        onDelete={handleDelete}
      />
    </>
  )
}

export default UsersPage
