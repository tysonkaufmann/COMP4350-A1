import React from 'react'
import Collapsible from 'react-collapsible'
import AnswerList from './AnswerList'
import CommentList from './CommentList'
import { Container, Row, Col } from 'react-bootstrap'

//Return a formatted question container (with answers and comments)
export default function Question({ question }) {
    var date = new Date(question.creation_date * 1000)
    date = date.toLocaleString()
    return (
        <Collapsible trigger={
            <Container>
                <Row className="border bg-secondary text-light">
                    <Col>
                        Date: {date}
                    </Col>
                    <Col>
                        Score: {question.score}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div dangerouslySetInnerHTML={{ __html: question.title }}/>
                    </Col>
                </Row>
            </Container>}>
            <Container className="list-group-item-light mt-2 col-md-12">
                <Row className="p-2">
                    <div dangerouslySetInnerHTML={{ __html: question.body }}/>
                </Row>
                <Row className="p-2">
                    <AnswerList answers={question.answers} />
                </Row>
                <Row className="p-2">
                    <CommentList comments={question.comments} />
                </Row>
            </Container>
        </Collapsible>
    )
}
