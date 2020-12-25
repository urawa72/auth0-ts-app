#!/bin/sh

curl localhost:8081

curl -X POST -H 'Content-Type: application/json' -d '{
  "title": "How do I make a sandwich?",
  "description": "I am trying very hard, but I do not know how to make a delicious sandwich. Can someone help me?"
}' localhost:8081/questions

curl -X POST -H 'Content-Type: application/json' -d '{
  "title": "What is React?",
  "description": "I have been hearing a lot about React. What is it?"
}' localhost:8081/questions

curl localhost:8081

curl -X POST -H 'Content-Type: application/json' -d '{
  "answer": "Just spread butter on the bread, and that is it."
}' localhost:8081/answers/1
