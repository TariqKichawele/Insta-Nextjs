import Link from 'next/link'
import React from 'react'
import { ChevronLeft, CogIcon, CheckIcon } from 'lucide-react'
import { Follower } from '@prisma/client';
import { Profile } from '@prisma/client';
import FollowButton from './FollowButton';
import Image from 'next/image';

const ProfileHeader = ({
    profile,
    isOurProfile,
    ourFollow
} : {
    profile: Profile;
    isOurProfile?: boolean;
    ourFollow: Follower | null;
}) => {
   
  return (
    <div>
      <section className="flex justify-between items-center">
        <button>
          <ChevronLeft/>
        </button>
        <div className="font-bold flex items-center gap-2">
          {profile.username}
          <div className="size-5 rounded-full bg-ig-red inline-flex justify-center items-center text-white">
            <CheckIcon size={16}/>
          </div>
        </div>
        <div>
          {isOurProfile && (
            <Link href='/settings'>
              <CogIcon/>
            </Link>
          )}
        </div>
      </section>
      <section className="mt-8 flex justify-center">
        <div className="size-48 p-2 rounded-full bg-gradient-to-tr from-ig-orange to-ig-red">
          <div className="size-44 p-2 bg-white dark:bg-black rounded-full">
            <div className="size-40 aspect-square overflow-hidden rounded-full">
              <Image
                src={profile.avatar || ''}
                alt=""
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="text-center mt-4">
        <h1 className="text-xl font-bold">{profile.name}</h1>
        <p className="text-gray-500 mt-1 mb-1">{profile.subtitle}</p>
        <p className="">
          {profile.bio} 
        </p>
      </section>
      {!isOurProfile && (
        <section className="flex justify-center my-3">
          <FollowButton 
            ourFollow={ourFollow}
            profileIdToFollow={profile.id}
          />
        </section>
      )}
    </div>
  )
}

export default ProfileHeader