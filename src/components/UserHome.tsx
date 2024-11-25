import { prisma } from '@/db'
import { Session } from 'next-auth'
import React from 'react'
import HomeTopRow from './HomeTopRow';
import HomePosts from './HomePosts';

const UserHome = async ({ session }: { session: Session }) => {
  const follows = await prisma.follower.findMany({
    where: {
      followingProfileEmail: session?.user?.email || ''
    }
  });

  const profiles = await prisma.profile.findMany({
    where: {
      id: {
        in: follows.map((follow) => follow.followedProfileId)
      }
    }
  });

  return (
    <div className='flex flex-col gap-8'>
      <HomeTopRow profiles={profiles} />
      <HomePosts profiles={profiles} />
    </div>
  )
}

export default UserHome