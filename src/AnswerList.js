import React from 'react'
import Answer from './Answer'

//Return a list of formatted answer containers
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
