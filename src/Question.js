import React from 'react'
import Collapsible from 'react-collapsible'
import Answer from './Answer'
import Comment from './Comment'
import AnswerList from './AnswerList'
import CommentList from './CommentList'

export default function Question({ question }) {
    return (
        <Collapsible trigger={question.title}>
            <h1>Question:</h1>
            <div dangerouslySetInnerHTML={{ __html: question.body }}/>
            <h1>Answers:</h1>
            <AnswerList answers={question.answers} />
            <h1>Comments:</h1>
            <CommentList comments={question.comments} />
        </Collapsible>
    )
}
