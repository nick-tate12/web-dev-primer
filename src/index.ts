/*
 *  index.ts
 *  Project: First Exercise
 *
 *  Author: Nick Tate
 *  Created on: Jan 19, 2023
 */

import express, { Express, Request, Response } from 'express';
import ip from 'ip';

const app: Express = express();
const PORT = 8191;

function getRoot(req: Request, res: Response): void {
  res.send('Hello World from Nick!');
}

function handleListenEvent(): void {
  console.log(`Listening on port http://${ip.address()}:${PORT}`);
}

app.listen(PORT, handleListenEvent);
app.get('/', getRoot);

// Merging Arrays:
function merge(arr1: Array<number>, arr2: Array<number>): Array<number> {
  const arr3: Array<number> = [];
  let lilArr = arr1;
  let bigArr = arr2;
  if (arr2.length < arr1.length) {
    lilArr = arr2;
    bigArr = arr1;
  }
  for (let i = 0; i < lilArr.length; i += 1) {
    arr3.push(arr1[i]);
    arr3.push(arr2[i]);
  }
  for (let i = lilArr.length; i < bigArr.length; i += 1) {
    arr3.push(bigArr[i]);
  }
  return arr3;
}

console.log('Merge Testing:');
// Part 1 testing
const array1: Array<number> = [4, 5, 23, 18, 9, -5, 31];
const array2: Array<number> = [18, 74, 88, 3, 7, 44, 108];

const mergedArray1: Array<number> = merge(array1, array2);
console.log(`Part 1 testing:\n${mergedArray1}\n`);

// Part 2 testing
const array3: Array<number> = [4, 5, 23, 18, 9, -5, 31];
const array4: Array<number> = [18, 74, 88, 3];

const mergedArray2: Array<number> = merge(array3, array4);
const mergedArray3: Array<number> = merge(array4, array3);
console.log(`Part 2 testing:\n${mergedArray2}`);
console.log(`${mergedArray3}\n`);

// Wordle:
function checkWord(testWord: string, secretWord: string): string {
  let result = '';
  for (let i = 0; i < 5; i += 1) {
    if (secretWord.includes(testWord[i])) {
      if (secretWord[i] === testWord[i]) {
        result += 'c';
      } else {
        result += 'p';
      }
    } else {
      result += 'a';
    }
  }
  return result;
}

const attempts = ['rains', 'shout', 'scope', 'spoke'];
console.log('Wordle testing:');
for (const word of attempts) {
  const result = checkWord(word, 'spoke');
  console.log(result);
}
console.log();

// Elections: Part 1
type Candidate = {
  name: string;
  votes: Array<number>;
  funding: number;
};

const candidate1: Candidate = {
  name: 'Edward Underwood',
  votes: [192, 147, 186, 114, 267],
  funding: 58182890,
};

const candidate2: Candidate = {
  name: 'Rose Olson',
  votes: [48, 90, 12, 21, 13],
  funding: 78889263,
};

const candidate3: Candidate = {
  name: 'Leonard Willis',
  votes: [206, 312, 121, 408, 382],
  funding: 36070689,
};

const candidate4: Candidate = {
  name: 'Nathaniel Taylor',
  votes: [37, 21, 38, 39, 29],
  funding: 6317921937,
};

const allCandidates: Array<Candidate> = [candidate1, candidate2, candidate3, candidate4];

// Part 2: Analyze the votes
const allVotes: Array<number> = [];

// temporary counter for each candidate
let count = 0;

let totalVotes = 0;

for (const person of allCandidates) {
  for (const vote of person.votes) {
    count += vote;
    totalVotes += vote;
  }
  allVotes.push(count);
  count = 0;
}

const numCandidates = allCandidates.length;
for (let i = 0; i < numCandidates; i += 1) {
  const tempPercentCalc = Number(((allVotes[i] / totalVotes) * 100).toFixed(2));
  console.log(
    `${allCandidates[i].name}: ${allVotes[i]} votes (${tempPercentCalc}% of all votes)\n`
  );
}

const allPrecincts: Array<Array<number>> = [];
const numPrecincts = candidate1.votes.length;
let counter = 0;
const precinctTotals: Array<number> = [];
for (let i = 0; i < numPrecincts; i += 1) {
  allPrecincts.push([
    candidate1.votes[i],
    candidate2.votes[i],
    candidate3.votes[i],
    candidate4.votes[i],
  ]);
  counter = candidate1.votes[i] + candidate2.votes[i] + candidate3.votes[i] + candidate4.votes[i];
  precinctTotals.push(counter);
}

// determines the two runner-ups for the certain precinct
function findRunners(arrScores: Array<number>, arrNames: Array<string>): Array<string> {
  let topIndex = 0;
  let secIndex = 0;
  for (let i = 1; i < arrScores.length; i += 1) {
    if (arrScores[topIndex] < arrScores[i]) {
      secIndex = topIndex;
      topIndex = i;
    }
  }
  return [arrNames[topIndex], arrNames[secIndex]];
}

let winner = '';
const runnerNames: Array<string> = [];
const runnerScores: Array<number> = [];
for (let i = 0; i < precinctTotals.length; i += 1) {
  console.log(`Precinct ${i + 1}:`);
  for (let j = 0; j < allPrecincts[0].length; j += 1) {
    const tempPercent = Number(((allPrecincts[i][j] / precinctTotals[i]) * 100).toFixed(2));
    console.log(`\t${allCandidates[j].name} - ${tempPercent}`);
    if (tempPercent > 50) {
      winner = allCandidates[j].name;
    }
    if (!winner) {
      runnerNames.push(allCandidates[j].name);
      runnerScores.push(tempPercent);
    }
  }
  if (winner) {
    console.log(`Winner for Precinct ${i + 1} is... ${winner}\n`);
    runnerNames.splice(0);
    runnerScores.splice(0);
  } else {
    const runOff = findRunners(runnerScores, runnerNames);
    console.log(`There's a run-off! ${runOff[0]} vs. ${runOff[1]}\n`);
  }
}
