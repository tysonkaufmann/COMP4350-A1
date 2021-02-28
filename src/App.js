import React, { useState, useRef } from 'react'
import QuestionList from './QuestionList'

var testdata = [{score: 0, creation_date: 1614460036, question_id: 66403487, link: "https://stackoverflow.com/questions/66403487/how-t…idate-xml-data-from-log-file-content-using-python", title: "How to validate XML data from log file content using python"}, {score: 0, creation_date: 1614460002, question_id: 66403483, link: "https://stackoverflow.com/questions/66403483/domain-restriction-in-babelnet", title: "Domain Restriction in BabelNet"}, {score: 0, creation_date: 1614459998, question_id: 66403481, link: "https://stackoverflow.com/questions/66403481/setting-up-aws-elb-with-backend-express-app", title: "Setting up AWS ELB with backend express app"}]

var stackexchange = require('stackexchange')
var context = new stackexchange()
var filterTop = {
  pagesize: 10,
  sort: 'votes',
  order: 'desc',
  filter: '!2A0j)MOzD3wIaLkC-MkJcgdAVxXrUZAn.(GA3LgB2zdb1.RCIYYIzL'
}
var filterNew = {
  pagesize: 10,
  //sort: 'creation',
  sort: 'votes',
  order: 'desc',
  filter: '!2A0j)MOzD3wIaLkC-MkJcgdAVxXrUZAn.(GA3LgB2zdb1.RCIYYIzL'
}
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
  //TODO add filters here
  //var filterTop = 
  //var filterNew =
  let newQuestions = await reqQuestions(filterNew)

  
  console.log("Got new questions")
  console.log(newQuestions)

  //Send query for 10 top questions based on tag
  //var topQuestions = context.questions.questions(filterTop, function(err, results){
  //  if (err) throw err
  //  console.log(results)
  //  return results.items
  //})
  console.log("Returning getQuestions")
  return newQuestions
}

function App() {
  //questions are all of our question information
  //updateQuestions is the function for updating questions
  const [questions, updateQuestions] = useState([])
  const questionTagRef = useRef()

  function searchQuestions(e) {
    const tag = questionTagRef.current.value
    if (tag === '') return
    //console.log(tag)

    getQuestions(tag).then((value) => {
      console.log("before update questions")
      console.log(value)
      updateQuestions(value)
    }).catch(err => {
      console.log(err)
    })

    //updateQuestions(() => {
      //Send query for 10 newest questions based on tag

    //  return getQuestions(tag)
    //})
    questionTagRef.current.value = null
  }

  return (
    <>
      <input ref={questionTagRef} type="text" />
      <button onClick={searchQuestions}>Search</button>
      <QuestionList questions={questions} />
      <div>Completed request in (#)ms</div>
    </>
  )
}

export default App;
