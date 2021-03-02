import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

//Return a formatted comment container
export default function Comment({ comment }) {
    var date = new Date(comment.creation_date * 1000)
    date = date.toLocaleString()
    return (
        <Container className="border list-group-item-secondary mt-2 col-md-12">
            <Row className="bg-secondary border text-light">
                <Col>Date: {date}</Col>
                <Col>Score: {comment.score}</Col>
            </Row>
            <Row className="p-2">
                <div dangerouslySetInnerHTML={{ __html: comment.body }}/>
            </Row>
        </Container>
    )
}
