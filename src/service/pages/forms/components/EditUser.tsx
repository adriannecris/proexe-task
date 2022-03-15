import { Form, Input, Button, Card, Space } from 'antd'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../../store'
import { editUser } from '../../../../store/reducers/UsersReducer'
import { IUsers } from '../../../../store/reducers/types/Users'

const EditUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [globalLoading, setGlobalLoading] = useState<boolean>(true)
  const [user, setUser] = useState<IUsers | null>(null)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { userId } = useParams<'userId'>()
  const { users } = useAppSelector(state => state.users)

  useEffect(() => {
    const find = users.find(user => user.id.toString() === userId)
    if (find) {
      setUser(find)
      setGlobalLoading(false)
    } else navigate('/')
  }, [navigate, users, userId])

  const onFinish = (values: any) => {
    if (!user) return
    setIsLoading(true)

    dispatch(
      editUser({
        id: user.id,
        address: {
          city: values.city,
        },
        email: values.email,
        username: values.username,
        name: values.name,
      }),
    )
    setTimeout(() => {
      setIsLoading(false)
      navigate('/')
    }, 2000)
  }

  if (globalLoading || !user) return null

  return (
    <Card title={`Edit ${user.username} <${user.email}>`}>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
          initialValue={user.username}>
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
          ]}
          initialValue={user.email}>
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item label="Name" name="name" initialValue={user.name}>
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item label="City" name="city" initialValue={user.address.city}>
          <Input placeholder="Enter your city" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 16 }}>
          <Space size={8}>
            <Link to={'/'}>
              <Button type="primary" htmlType="submit" danger>
                Cancel
              </Button>
            </Link>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: '#2ecc71' }}
              loading={isLoading}>
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default EditUser
