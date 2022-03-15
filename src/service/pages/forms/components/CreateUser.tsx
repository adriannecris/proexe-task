import { Form, Input, Button, Card, Space } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../../store'
import { addUser } from '../../../../store/reducers/UsersReducer'
import { v4 as uuidv4 } from 'uuid'

const CreateForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const onFinish = (values: any) => {
    setIsLoading(true)

    dispatch(
      addUser({
        id: uuidv4(),
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

  return (
    <Card title="Form">
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}>
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
          ]}>
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item label="Name" name="name">
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item label="City" name="city">
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

export default CreateForm
