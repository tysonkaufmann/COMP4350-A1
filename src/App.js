import React, { useState, useRef } from 'react'
import QuestionList from './QuestionList'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap'

var stackexchange = require('stackexchange')
var context = new stackexchange()


//Filter options (i think)
// fromdate: 1614297600 === Feb 26 2021
// todate:
// body:

function reqQuestions(filter) {
  console.log("In reqQuestions")
  return new Promise((resolve, reject) => {
    context.questions.questions(filter, function(err, results){
      if (err) throw err
      console.log("Requests remaining for today: " + results.quota_remaining)
      resolve(results.items)
    })
  })
}

async function getQuestions(tag) {
  console.log("In getQuestions")
  
  //Current time in UNIX timestamp for filter
  var toDate = parseInt(new Date().getTime() / 1000, 10)

  //One week is 604800 seconds
  var fromDate = toDate - 604800

  var filterTop = {
    pagesize: 10,
    sort: 'votes',
    order: 'desc',
    fromdate: fromDate,
    todate: toDate,
    tagged: tag,
    filter: '!2A0j)MOzD3wIaLkC-MkJcgdAVxXrUZAn.(GA3LgB2zdb1.RCIYYIzL'
  }

  var filterNew = {
    pagesize: 10,
    sort: 'creation',
    order: 'desc',
    fromdate: fromDate,
    todate: toDate,
    tagged: tag,
    filter: '!2A0j)MOzD3wIaLkC-MkJcgdAVxXrUZAn.(GA3LgB2zdb1.RCIYYIzL'
  }

  let newQuestions = await reqQuestions(filterNew)
  let topQuestions = await reqQuestions(filterTop)

  //Return list in desending order by creation date (newest first)
  return [...newQuestions, ...topQuestions].sort((a,b) => b.creation_date - a.creation_date)
}

function App() {
  //questions are all of our question information
  //updateQuestions is the function for updating questions
  const [questions, updateQuestions] = useState([])
  const questionTagRef = useRef()
  const [timeTaken, updateTimeTaken] = useState([])

  function searchQuestions(e) {
    const tag = questionTagRef.current.value
    if (tag === '') return
    //console.log(tag)
    var startTime = new Date()

    getQuestions(tag).then((value) => {
      console.log("before update questions")
      console.log(value)
      updateQuestions(value)
    }).then(() => {
      var totalTime = new Date() - startTime
      updateTimeTaken("Completed Request in: " + totalTime + "ms")
    }).catch(err => {
      console.log(err)
    })

    questionTagRef.current.value = null
  }

  return (
    <>
      <Container>
        <Form>
          <Form.Group>
            <Form.Label>
              <h1>Stack Overflow Search</h1>
            </Form.Label>
            <Form.Control type="input" ref={questionTagRef} />
            <Form.Text className="text-muted">Search for a tag!</Form.Text>
            <Button onClick={searchQuestions}>Search</Button>
          </Form.Group>
        </Form>
      </Container>
      <Container>
        <QuestionList questions={questions} />
      </Container>
      <Container>
        <div>{timeTaken}</div>
      </Container>
    </>
  )
}

export default App;
