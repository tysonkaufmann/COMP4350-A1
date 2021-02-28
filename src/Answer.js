import React from 'react'
import CommentList from './CommentList'

export default function Answer({ answer }) {
    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: answer.body }}/>
            <CommentList comments={answer.comments} />
        </>
    )
}
