import React, { useState, useRef } from 'react'
import QuestionList from './QuestionList'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Button, Form } from 'react-bootstrap'

//Library for querying stackexchange API site defaults to stackoverflow
var stackexchange = require('stackexchange')
var context = new stackexchange()

//Sends a request to stackexchange API with the given filter
function reqQuestions(filter) {
  return new Promise((resolve, reject) => {
    context.questions.questions(filter, function(err, results){
      if (err) throw err
      resolve(results)
    })
  })
}

//Gets questions based on given tag
//Makes 2 calls to stackexchange API for 10 top and 10 new questions
async function getQuestions(tag) {
  //Current time in UNIX timestamp for filter
  var toDate = parseInt(new Date().getTime() / 1000, 10)

  //One week is 604800 seconds
  var fromDate = toDate - 604800

  //Filter to get top (highest voted) questions
  var filterTop = {
    pagesize: 10,
    sort: 'votes',
    order: 'desc',
    fromdate: fromDate,
    todate: toDate,
    tagged: tag,
    site: 'stackoverflow',
    filter: '!2A0j)MOzD3wIaLkC-MkJcgdAVxXrUZAn.(GA3LgB2zdb1.RCIYYIzL'
  }

  //Filter to get newest questions
  var filterNew = {
    pagesize: 10,
    sort: 'creation',
    order: 'desc',
    fromdate: fromDate,
    todate: toDate,
    tagged: tag,
    site: 'stackoverflow',
    filter: '!2A0j)MOzD3wIaLkC-MkJcgdAVxXrUZAn.(GA3LgB2zdb1.RCIYYIzL'
  }

  //Make 2 requests to stackexchange API with filters
  let newQuestions = await reqQuestions(filterNew)
  let topQuestions = await reqQuestions(filterTop)

  //Return questions and quota remaining
  var returnValues = {}
  returnValues.items = [...newQuestions.items, ...topQuestions.items].sort((a,b) => b.creation_date - a.creation_date)
  returnValues.quota = topQuestions.quota_remaining

  //Return list in desending order by creation date (newest first)
  return returnValues
}

function App() {
  //State to update list and variables
  const [questions, updateQuestions] = useState([])
  const [timeTaken, updateTimeTaken] = useState([])
  const [tagSearched, updateTagSearched] = useState([])
  const [textPlaceholder, updateTextPlaceholder] = useState([])
  const questionTagRef = useRef()

  //Function called when button is clicked
  function searchQuestions(e) {
    const tag = questionTagRef.current.value
    if (tag === '') {
      updateTextPlaceholder("Input a tag please...")
      return
    }

    updateTextPlaceholder("Processing...")

    var startTime = new Date()

    //Search for the tag and update list
    getQuestions(tag).then((values) => {
      updateQuestions(values.items)
      updateTextPlaceholder("Queries remaining for today: " + values.quota)
    }).then(() => {
      var totalTime = new Date() - startTime
      updateTimeTaken("Completed request in: " + totalTime + "ms")
      updateTagSearched("Results for tag: " + tag)
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
            <Form.Control placeholder={textPlaceholder} type="input" ref={questionTagRef} />
            <Form.Text className="text-muted">Search for a tag!</Form.Text>
            <Button onClick={searchQuestions}>Search</Button>
          </Form.Group>
        </Form>
      </Container>
      <Container>
        {tagSearched}
        </Container>
      <Container>
        <QuestionList questions={questions} />
      </Container>
      <Container>
        {timeTaken}
      </Container>
    </>
  )
}

export default App;
