import { auth } from '@/auth'
import PostsGrid from '@/components/PostsGrid';
import ProfileHeader from '@/components/ProfileHeader';
import ProfileNav from '@/components/ProfileNav';
import { prisma } from '@/db';
import React from 'react'

const Bookmarked = async () => {
    const session = await auth();
    const profile = await prisma.profile.findFirst({
        where: {
            email: session?.user?.email as string
        }
    });

    const bookmarks = await prisma.bookmark.findMany({
        where: {
            author: session?.user?.email as string
        }
    });

    const posts = await prisma.post.findMany({
        where: {
            id: {
                in: bookmarks.map((bookmark) => bookmark.postId)
            }
        }
    });

  return (
    <div>

        <ProfileHeader
            profile={profile}
            isOurProfile={true}
            ourFollow={null} 
        />
        <ProfileNav
            username={profile?.username || ''}
            isOurProfile={true} 
        />
        <div className="mt-4">
            {posts.length === 0 ? (
                <p>No bookmarks found.</p>
            ) : (
                <PostsGrid posts={posts} />
            )}
        </div>
    </div>
  )
}

export default Bookmarked