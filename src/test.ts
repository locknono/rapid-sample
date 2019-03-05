import rapidSampling = require("./index");
const { IFocus, getOriginalEstimates } = rapidSampling;

function getRelations(es: number[]) {
  const r = [];
  for (let i = 0; i < es.length; i++) {
    for (let j = i; j < es.length; j++) {
      if (es[i] > es[j]) {
        r.push(1);
      } else {
        r.push(0);
      }
    }
  }
  return r;
}

function compareRelations(r1: number[], r2: number[]) {
  let count = 0;
  for (let i = 0; i < r1.length; i++) {
    if (r1[i] == r2[i]) {
      count += 1;
    }
  }
  return count / r1.length;
}

function getRandomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const groupNumber = 10;
const maxPointsCount = 100;
let itemCount = 0;
const groups = [];
for (let i = 0; i < groupNumber; i++) {
  const group = [];
  for (let j = 0; j < maxPointsCount; j++) {
    if (j % 3 == 0) {
      const item = {
        id: ++itemCount,
        value: getRandomNumber(i / 13, i / 10)
      };
      group.push(item);
    } else {
      const item = {
        id: ++itemCount,
        value: getRandomNumber(i / 20, i / 10)
      };
      group.push(item);
    }
  }
  groups.push(group);
}

const rList = [];

const c = 1;
for (let i = 0; i < 5; i++) {
  try {
    const groups2 = JSON.parse(JSON.stringify(groups));
    const e1 = getOriginalEstimates(groups2);

    const { estimates, sampleGroups } = IFocus(groups2, 0.05, c);

    const r1 = getRelations(e1);
    const r2 = getRelations(estimates);

    const ratio = compareRelations(r1, r2);

    rList.push(ratio);
    console.log("sampleGroups: ", sampleGroups);
  } catch (e) {
    console.error("e: ", e);
  }
}
console.log("rList: ", rList);
