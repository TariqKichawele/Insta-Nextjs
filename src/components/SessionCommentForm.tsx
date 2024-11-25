import { auth } from '@/auth';
import { prisma } from '@/db';
import React from 'react'
import CommentForm from './CommentForm';

const SessionCommentForm = async ({ postId }: { postId: string }) => {
    const session = await auth();
    const profile = await prisma.profile.findFirstOrThrow({
        where: {
            email: session?.user?.email as string
        }
    })
  return (
    <CommentForm 
        avatar={profile.avatar || ''}
        postId={postId}
    />
  )
}

export default SessionCommentForm