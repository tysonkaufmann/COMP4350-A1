import React from 'react'
import CommentList from './CommentList'
import { Container, Row, Col } from 'react-bootstrap'

//Return a formatted answer container (with comments)
export default function Answer({ answer }) {
    var date = new Date(answer.creation_date * 1000)
    date = date.toLocaleString()
    return (
        <Container className="border list-group-item-info mt-2 col-md-12">
            <Row className="bg-secondary border text-light">
                <Col>Date: {date}</Col>
                <Col>Score: {answer.score}</Col>
            </Row>
            <Row className="p-2">
                <div dangerouslySetInnerHTML={{ __html: answer.body }}/>
                <CommentList comments={answer.comments} />
            </Row>
        </Container>
    )
}
