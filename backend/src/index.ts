import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

interface Question {
  id: number;
  title: string;
  description: string;
  answers: string[];
}

const app = express();
const questions: Question[] = [];
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

app.get("/", (_, res) => {
  const qs = questions.map(
    (q): Question => ({
      id: q.id,
      title: q.title,
      description: q.description,
      answers: q.answers,
    })
  );
  res.send(qs);
});

app.get("/:id", (req, res) => {
  const question = questions.filter((q) => q.id === parseInt(req.params.id));
  if (question.length > 1) return res.status(500).send();
  if (questions.length === 0) return res.status(404).send();
  res.send(question[0]);
});

app.post("/", (req, res) => {
  const { title, description } = req.body;
  const newQuestion: Question = {
    id: questions.length + 1,
    title,
    description,
    answers: [],
  };
  questions.push(newQuestion);
  res.status(200).send();
});

app.post("/answer/:id", (req, res) => {
  const { answer } = req.body;

  const question = questions.filter((q) => q.id === parseInt(req.params.id));
  if (question.length > 1) return res.status(500).send();
  if (questions.length === 0) return res.status(404).send();

  // FIXME: type definition
  question[0].answers.push(answer);
  res.status(200).send();
});

app.listen(8081, () => {
  console.log("linstening on port 8081");
});
