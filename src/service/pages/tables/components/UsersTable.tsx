import { Table, Space, TableColumnsType, Button, Card } from 'antd'
import { IUsers } from '../../../../store/reducers/types/Users'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'

const columns: TableColumnsType<IUsers> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    sorter: (a, b) => a.username.localeCompare(b.username),
  },
  {
    title: 'Email',
    key: 'email',
    dataIndex: 'email',
  },
  {
    title: 'City',
    key: 'address',
    dataIndex: 'address',
    render: (_, record) => record.address.city,
  },
]

export interface UsersTableProps {
  isLoading: boolean
  users: Array<IUsers>
  onDelete: (id: string, username: string) => void
}
const UsersTable: React.FC<UsersTableProps> = ({
  isLoading,
  users,
  onDelete,
}) => {
  const newColumns = useMemo((): TableColumnsType<IUsers> => {
    return [
      ...columns,
      {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
          <Space size="middle">
            <Link to={`users/${record.id}/edit`}>
              <Button type="primary" icon={<EditOutlined />} />
            </Link>

            <Button
              type="primary"
              icon={<DeleteOutlined />}
              danger
              onClick={() => onDelete(record.id, record.username)}
            />
          </Space>
        ),
      },
    ]
  }, [onDelete])

  return (
    <Card
      title="User List"
      extra={
        <Link to={`users/create`}>
          <Button type="primary" icon={<PlusOutlined />}>
            {' '}
            Add new
          </Button>
        </Link>
      }>
      <Table
        columns={newColumns}
        dataSource={users}
        loading={isLoading}
        pagination={false}
        scroll={{
          y: 500,
        }}
      />
    </Card>
  )
}

export default UsersTable
