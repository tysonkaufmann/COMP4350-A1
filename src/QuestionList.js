import React from 'react'
import Question from './Question'

//Return a list of formatted question containers
export default function QuestionList({ questions }) {
    return (
        questions.map(question => {
            return <Question key={question.question_id} question={question} />
        })
    )
}
