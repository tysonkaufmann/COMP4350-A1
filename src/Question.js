import React from 'react'
import Collapsible from 'react-collapsible'

export default function Question({ question }) {
    return (
        <Collapsible trigger={question.title}>
            <div dangerouslySetInnerHTML={{ __html: question.body }}/>
        </Collapsible>
    )
}
