import React from 'react'
import Answer from './Answer'

//TODO change key to use id of question/answer
export default function AnswerList({ answers }) {
    if (typeof answers === 'undefined') {
        return null
    } else {
        return (
            answers.map(answer => {
                return <Answer key={answer.answer_id} answer={answer} />
            })
        )
    }
}
