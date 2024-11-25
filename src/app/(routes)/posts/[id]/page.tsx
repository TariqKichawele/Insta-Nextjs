import { getSinglePostData } from '@/actions';
import SinglePostContent from '@/components/SinglePostContent';
import React from 'react'

const Post = async({ params }: { params: { id: string } }) => {
    const { post, authorProfile, comments, commentsAuthors, myLike, myBookmark } = await getSinglePostData(params.id);
  
    return (
    <SinglePostContent 
      post={post}
      authorProfile={authorProfile}
      comments={comments}
      commentsAuthors={commentsAuthors}
      myLike={myLike}
      myBookmark={myBookmark}
    />
  )
}

export default Post