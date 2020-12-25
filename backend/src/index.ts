import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import dotenv from 'dotenv';
dotenv.config();

interface Answer {
  answer: string;
  author: string;
}

interface Question {
  id: number;
  title: string;
  description: string;
  answers: Answer[];
  author: string;
}

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN!;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID!;

const app = express();
const questions: Question[] = [];
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/', (_, res) => {
  const qs = questions.map(
    (q): Question => ({
      id: q.id,
      title: q.title,
      description: q.description,
      answers: q.answers,
      author: q.author,
    })
  );
  res.send(qs);
});

app.get('/questions/:id', (req, res) => {
  console.log(req.params);
  const question = questions.filter((q) => q.id === parseInt(req.params.id));
  if (question.length > 1) return res.status(500).send();
  if (questions.length === 0) return res.status(404).send();
  res.send(question[0]);
});

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: AUTH0_CLIENT_ID,
  issuer: `https://${AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});

app.post('/questions', checkJwt, (req: any, res) => {
  const { title, description } = req.body;
  const newQuestion: Question = {
    id: questions.length + 1,
    title,
    description,
    answers: [],
    author: req.user.name,
  };
  questions.push(newQuestion);
  res.status(200).send();
});

app.post('/answers/:id', checkJwt, (req: any, res) => {
  const { answer } = req.body;

  const question = questions.filter((q) => q.id === parseInt(req.params.id));
  if (question.length > 1) return res.status(500).send();
  if (questions.length === 0) return res.status(404).send();

  // FIXME: type definition
  question[0].answers.push({ answer, author: req.user.name });
  res.status(200).send();
});

app.listen(8081, () => {
  console.log('linstening on port 8081');
});
