/*code with correct options on console*/
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Form } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// const QnA = () => {
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:3001/quiz').then((response) => {
//       const updatedQuestions = response.data.map((question) => {
//         return { ...question, selectedOption: null };
//       });
//       setQuestions(updatedQuestions);
//     });
//   }, []);

//   const handleOptionChange = (questionId, optionId) => {
//     setQuestions(
//       questions.map((question) => {
//         if (question.qid === questionId) {
//           question.selectedOption = optionId;
//         }
//         return question;
//       })
//     );
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let correctAnswers = 0;
//     questions.forEach((question) => {
//       if (question.selectedOption === question.coption) {
//         correctAnswers++;
//       }
//     });
//     console.log(`You answered ${correctAnswers} questions correctly.`);
//   };


//   return (
//     <Container>
//       <Form onSubmit={handleSubmit}>
//         {questions.map((question) => (
//           <Form.Group key={question.qid}>
//             <Form.Label>{question.question}</Form.Label>
//             <Form.Check
//               type="radio"
//               name={question.qid}
//               label={question.option1}
//               value={question.option1}
//               checked={question.option1 === question.selectedOption}
//               onChange={() => handleOptionChange(question.qid, question.option1)}
//             />
//             <Form.Check
//               type="radio"
//               name={question.qid}
//               label={question.option2}
//               value={question.option2}
//               checked={question.option2 === question.selectedOption}
//               onChange={() => handleOptionChange(question.qid, question.option2)}
//             />
//             <Form.Check
//               type="radio"
//               name={question.qid}
//               label={question.option3}
//               value={question.option3}
//               checked={question.option3 === question.selectedOption}
//               onChange={() => handleOptionChange(question.qid, question.option3)}
//             />
//             <Form.Check
//               type="radio"
//               name={question.qid}
//               label={question.option4}
//               value={question.option4}
//               checked={question.option4 === question.selectedOption}
//               onChange={() => handleOptionChange(question.qid, question.option4)}
//             />
//           </Form.Group>
//         ))}
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </Form>
//     </Container>
//   );
// };

/*code with correct options on react page*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const QnA = () => {
  const [questions, setQuestions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/quiz').then((response) => {
        const updatedQuestions = shuffleArray(response.data).map((question) => {
            const options = [question.option1, question.option2, question.option3];
            const shuffledOptions = shuffleArray(options);
            //const shuffledQuestions = shuffleArray(...question);
            return { ...question,
                 selectedOption: null,
                 option1: shuffledOptions[0],
                 option2: shuffledOptions[1],
                 option3: shuffledOptions[2]
                 };
          });
      setQuestions(updatedQuestions);
    });
  }, []);

  const handleOptionChange = (questionId, optionId) => {
    setQuestions(
      questions.map((question) => {
        if (question.qid === questionId) {
          question.selectedOption = optionId;
        }
        return question;
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let correctAnswersCount = 0;
    questions.forEach((question) => {
      if (question.selectedOption === question.coption) {
        correctAnswersCount++;
      }
    });
    setCorrectAnswers(correctAnswersCount);
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <Container>
      {correctAnswers !== null && (
        <div className="text-center">
          <h2>
            You answered {correctAnswers} out of {questions.length} questions correctly.
          </h2>
          {questions.map((question) => (
            <div key={question.qid} className="mt-4">
              <h4>{question.question}</h4>
              <p>Correct answer: {question.coption}</p>
              {question.selectedOption === question.coption ? (
                <p className="text-success">Your answer was correct!</p>
              ) : (
                <p className="text-danger">
                  Your answer was incorrect. The correct answer was{' '}
                  {question.coption}.
                </p>
              )}
            </div>
          ))}
        </div>
      )}
      {correctAnswers === null && (
        <Form onSubmit={handleSubmit}>
          {questions.map((question) => (
            <Form.Group key={question.qid}>
              <Form.Label>{question.question}</Form.Label>
              <Form.Check
                type="radio"
                name={question.qid}
                label={question.option1}
                value={question.option1}
                checked={question.option1 === question.selectedOption}
                onChange={() => handleOptionChange(question.qid, question.option1)}
              />
              <Form.Check
                type="radio"
                name={question.qid}
                label={question.option2}
                value={question.option2}
                checked={question.option2 === question.selectedOption}
                onChange={() => handleOptionChange(question.qid, question.option2)}
              />
              <Form.Check
                type="radio"
                name={question.qid}
                label={question.option3}
                value={question.option3}
                checked={question.option3 === question.selectedOption}
                onChange={() => handleOptionChange(question.qid, question.option3)}
              />
              <Form.Check
                type="radio"
                name={question.qid}
                label={question.option4}
                value={question.option4}
                checked={question.option4 === question.selectedOption}
                onChange={() => handleOptionChange(question.qid, question.option4)}
              />
            </Form.Group>
          ))}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Form>
      )}
      </Container>
  )
}

export default QnA;

