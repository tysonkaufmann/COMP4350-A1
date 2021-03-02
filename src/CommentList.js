import React from 'react'
import Comment from './Comment'

//Return a list of formatted comment containers
export default function CommentList({ comments }) {
    if (typeof comments === 'undefined') {
        return null
    } else {
        return (
            comments.map(comment => {
                return <Comment key={comment.comment_id} comment={comment} />
            })
        )
    }
}
