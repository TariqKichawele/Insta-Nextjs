import React from 'react'
import { auth } from '@/auth';
import { prisma } from '@/db';
import { redirect } from 'next/navigation';
import ProfilePageContent from '@/components/ProfilePageContent';

const Profile = async () => {
  const session = await auth();
  
  const profile = await prisma.profile.findFirst({
    where: {
      email: session?.user?.email as string
    }
  })

  if(!profile) {
    return redirect('/settings')
  };

  return (
    <>
      <ProfilePageContent 
        ourFollow={null}
        profile={profile}
        isOurProfile={true}
      />
    </>
  )
}

export default Profile