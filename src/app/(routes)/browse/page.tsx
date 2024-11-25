import PostsGrid from '@/components/PostsGrid';
import { prisma } from '@/db'
import React from 'react'

const Browse = async () => {
    const posts = await prisma.post.findMany({
        orderBy: { 
            createdAt: 'desc'
        },
        take: 100
    });

    return (
    <div>
        <div className='mb-4'>
            <h1 className='text-4xl font-bold text-slate-900 dark:text-white'>Browse</h1>
            <p className='text-gray-500 dark:text-gray-400'>See what’s happening in your local area</p>
        </div>
        <PostsGrid posts={posts} />
    </div>
  )
}

export default Browse