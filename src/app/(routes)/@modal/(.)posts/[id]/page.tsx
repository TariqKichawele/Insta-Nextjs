import Modal from '@/components/Modal'
import ModalPostContent from '@/components/ModalPostContent'
import Preloader from '@/components/PreLoader'
import React, { Suspense } from 'react'

const PostInModal = ({ params: { id } } : { params: { id: string } }) => {
  return (
    <Modal>
        <Suspense fallback={<Preloader />}>
            <ModalPostContent postId={id} />
        </Suspense>
    </Modal>
  )
}

export default PostInModal