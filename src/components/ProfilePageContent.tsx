import { Follower, Profile } from '@prisma/client'
import React, { Suspense } from 'react'
import Preloader from './PreLoader';
import ProfileNav from './ProfileNav';
import ProfileHeader from './ProfileHeader';
import ProfilePosts from './ProfilePosts';

const ProfilePageContent = ({
    profile,
    isOurProfile=false,
    ourFollow=null,
}: {
    profile: Profile;
    isOurProfile?: boolean;
    ourFollow: Follower | null;
}) => {

  return (
    <main>
        <ProfileHeader
            profile={profile}
            isOurProfile={isOurProfile}
            ourFollow={ourFollow} 
        />
        <ProfileNav
            username={profile.username || ''}
            isOurProfile={isOurProfile} 
        />
        <section className="mt-4">
            <Suspense fallback={<Preloader />}>
                <ProfilePosts email={profile.email} />
            </Suspense>
        </section>
    </main>
  )
}

export default ProfilePageContent