import React from 'react'
import Collapsible from 'react-collapsible'
import Answer from './Answer'
import Comment from './Comment'
import AnswerList from './AnswerList'
import CommentList from './CommentList'
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap'


export default function Question({ question }) {
    var date = new Date(question.creation_date * 1000)
    date = date.toLocaleString()
    //var title = "{question.score}+"-"+{date}+"-"{question.title}"
    //`Score: ${question.score} - Date: ${date} - Title: ${question.title}`
    return (
        <Collapsible trigger={
            <Container>
                <Row>
                    <Col>
                        Score: {question.score}
                    </Col>
                    <Col>
                        Date: {date}
                    </Col>
                </Row>
                <Row>
                    <div dangerouslySetInnerHTML={{ __html: question.title }}/>
                </Row>
            </Container>}>
            <Container className="list-group-item-light mt-2 col-md-12">
                <Row className="bg-secondary border text-light">
                    <Col>Creation date: {date}</Col>
                    <Col>Score: {question.score}</Col>
                </Row>
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
