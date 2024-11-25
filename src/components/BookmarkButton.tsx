'use client'

import { bookmarkPost } from '@/actions';
import { unbookmarkPost } from '@/actions';
import { Like, Post } from '@prisma/client'
import { BookmarkIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const BookmarkButton = ({
    post,
    sessionBookmark
} : {
    post: Post;
    sessionBookmark: Like | null;
}) => {
    const router = useRouter();
    const [ bookmarkedByMe, setBookmarkedByMe ] = useState<boolean>(!!sessionBookmark);

  return (
    <form
      action={async (data:FormData) => {
        setBookmarkedByMe(prev => !prev);
        if (bookmarkedByMe) {
          // remove bookmark
          await unbookmarkPost(post.id);
        } else {
          // add bookmark
          await bookmarkPost(post.id);
        }
        router.refresh();
      }}
      className="flex items-center gap-2"
    >
        <input type="hidden" name="postId" value={post.id}/>
        <button type="submit"className="">
            <BookmarkIcon className={bookmarkedByMe ? 'fill-gray-800 dark:text-white dark:fill-white' : 'dark:text-white'}/>
        </button>
    </form>
  )
}

export default BookmarkButton