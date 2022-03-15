import React, { Dispatch, SetStateAction, useState } from 'react'
import { Modal, Button } from 'antd'
import { SetState } from 'immer/dist/internal'

export interface DeleteUserModalProps {
  isModalVisible: boolean
  setIsModalVisible: Dispatch<SetStateAction<boolean>>
  user: {
    id: string
    username: string
  }
  onOk: () => void
  isLoading: boolean
}
const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  isModalVisible,
  setIsModalVisible,
  user,
  onOk,
  isLoading,
}) => {
  const handleOk = () => {
    onOk()
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <Modal
      title={`Delete - ID: ${user.id}`}
      visible={isModalVisible}
      okText="Delete"
      okButtonProps={{
        danger: true,
        loading: isLoading,
      }}
      onOk={handleOk}
      onCancel={handleCancel}>
      <p>Are you sure you want to delete {user.username}?</p>
    </Modal>
  )
}

export default DeleteUserModal
