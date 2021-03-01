import React from 'react'
import Collapsible from 'react-collapsible'
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap'

export default function Comment({ comment }) {
    var date = new Date(comment.creation_date * 1000)
    date = date.toLocaleString()
    return (
        <Container className="border list-group-item-secondary mt-2 col-md-12">
            <Row className="bg-secondary border text-light">
                <Col>Creation date: {date}</Col>
                <Col>Score: {comment.score}</Col>
            </Row>
            <Row className="p-2">
                <div dangerouslySetInnerHTML={{ __html: comment.body }}/>
            </Row>
        </Container>
    )
}
