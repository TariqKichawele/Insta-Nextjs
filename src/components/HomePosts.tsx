import { getSessionEmailOrThrow } from '@/actions';
import { prisma } from '@/db';
import { Profile } from '@prisma/client';
import Link from 'next/link';
import { Avatar } from '@radix-ui/themes'
import React from 'react'
import LikesInfo from './LikesInfo';
import BookmarkButton from './BookmarkButton';
import Image from 'next/image';

const HomePosts = async ({
    profiles
} : {
    profiles: Profile[];
}) => {
    const posts = await prisma.post.findMany({
        where: {
            author: {
                in: profiles.map((profile) => profile.email)
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 100
    });

    const likes = await prisma.like.findMany({
        where: {
            author: await getSessionEmailOrThrow(),
            postId: {
                in: posts.map((post) => post.id)
            }
        }
    });

    const bookmarks = await prisma.bookmark.findMany({
        where: {
            author: await getSessionEmailOrThrow(),
            postId: {
                in: posts.map((post) => post.id)
            }
        }
    });

  return (
    <div className="max-w-md mx-auto flex flex-col gap-12">
      {posts.map(post => {
        const profile = profiles.find(p => p.email === post.author);
        return (
          <div key={post.id}>
            <Link href={`/posts/${post.id}`}>
                <Image
                    className="block rounded-lg shadow-md shadow-black/50"
                    src={post.image} 
                    alt=""
                    width={500}
                    height={500}
                />
            </Link>
            <div className="flex items-center gap-2 mt-4 justify-between">
                <div className="flex gap-2 items-center">
                    <Avatar
                        radius="full"
                        src={profile?.avatar || ''}
                        size="2"
                        fallback="avatar" 
                    />
                    <Link
                        className="font-bold text-gray-700 dark:text-gray-300"
                        href={`/users/${profile?.username}`}
                    >
                        {profile?.name}
                    </Link>
                </div>
                <div className="flex gap-2 items-center">
                    <LikesInfo
                        post={post}
                        showText={false}
                        sessionLike={likes.find(like => like.postId === post.id) || null}
                    />
                    <BookmarkButton
                        post={post}
                        sessionBookmark={bookmarks.find(b => b.postId === post.id) || null} 
                    />
                </div>
            </div>
            <p className="mt-2 text-slate-600 dark:text-gray-400">
              {post.description}
            </p>
          </div>
        );
      })}
    </div>
  )
}

export default HomePosts