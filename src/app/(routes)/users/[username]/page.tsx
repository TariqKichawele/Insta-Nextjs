import { getSessionEmail } from '@/actions'
import ProfilePageContent from '@/components/ProfilePageContent';
import { prisma } from '@/db';
import React from 'react'

const User = async ({ 
    params: { username }, 
} : { params: { username: string } 
}) => {
    const sessionEmail = await getSessionEmail() || '';
    const profile = await prisma.profile.findFirstOrThrow({
        where: {
            username
        }
    });

    const ourFollow = await prisma.follower.findFirst({
        where: {
            followingProfileEmail: sessionEmail,
            followingProfileId: profile.id
        }
    });

    return (
        <ProfilePageContent
            isOurProfile={profile.email === sessionEmail}
            ourFollow={ourFollow}
            profile={profile} 
        />
    )
}

export default User