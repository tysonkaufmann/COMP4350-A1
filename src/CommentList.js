import React from 'react'
import Comment from './Comment'

//TODO change key to use id of question/answer
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
