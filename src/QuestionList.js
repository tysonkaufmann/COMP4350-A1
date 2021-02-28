import React from 'react'
import Question from './Question'

//TODO change key to use id of question/answer
export default function QuestionList({ questions }) {
    return (
        questions.map(question => {
            return <Question key={question.question_id} question={question} />
        })
    )
}
