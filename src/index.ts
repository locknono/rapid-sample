interface Item {
  id?: string;
  value: number;
}

type Group = Item[];

type Groups = Group[];

function IFocus(groups: Groups, delta: number, c: number) {
  const k = groups.length;

  const A = [];
  for (let i = 0; i < k; i++) {
    A.push(i);
  }

  let m = 1;

  const sampleGroups: Groups = groups.map((e, i) => {
    const singleSample = drawOneSampleFromOneGroup(e);
    return [singleSample];
  });

  const estimates = sampleGroups.map(e => getEstimateForOneGroup(e));

  const N = getMaxNInActiveGroups(A, groups);

  while (A.length > 0) {
    m = m + 1;
    const epsilon = getEpsilon(m, N, k, delta, c);
    for (let i = 0; i < A.length; i++) {
      const singleSample = drawOneSampleFromOneGroup(groups[A[i]]);
      sampleGroups[A[i]].push(singleSample);
      estimates[A[i]] =
        ((m - 1) / m) * estimates[A[i]] + (1 / m) * singleSample.value;
    }
    for (let i = A.length - 1; i >= 0; i--) {
      if (ifActive(estimates, A[i], epsilon) === false) {
        A.splice(i, 1);
      }
    }
  }
  return { estimates, sampleGroups };
}

/**
 * get max n in active groups
 */
function getMaxNInActiveGroups(A: number[], groups: Groups) {
  let v = Number.MIN_VALUE;
  for (let i = 0; i < A.length; i++) {
    if (groups[A[i]].length > v) v = groups[A[i]].length;
  }

  return v;
}

function getEpsilon(m: number, N: number, k: number, delta: number, c: number) {
  const part1 = 1 - (m - 1) / N;
  const part2 = 2 * Math.log2(Math.log2(m));
  const part3 = Math.log2((Math.pow(Math.PI, 2) * k) / (3 * delta));
  const epsilon = c * Math.sqrt((part1 * (part2 + part3)) / (2 * m));
  return epsilon;
}
function drawOneSampleFromOneGroup(group: Group): Item {
  const randomIndex = Math.round(Math.random() * (group.length - 1));
  const sample = group[randomIndex];
  group.splice(randomIndex, 1);
  return sample;
}

function getEstimateForOneGroup(group: Group): number {
  let sum = 0;
  for (let v of group) {
    sum += v.value;
  }
  return sum / group.length;
}

function ifActive(estimates: number[], index: number, epsilon: number) {
  for (let i = 0; i < estimates.length; i++) {
    if (index === i) continue;
    if (
      estimates[index] + epsilon > estimates[i] - epsilon &&
      estimates[index] + epsilon < estimates[i] + epsilon
    ) {
      return true;
    }
    if (
      estimates[index] - epsilon > estimates[i] - epsilon &&
      estimates[index] - epsilon < estimates[i] + epsilon
    ) {
      return true;
    }
  }
  return false;
}

function getOriginalEstimates(groups: Groups) {
  const es = [];
  for (let i = 0; i < groups.length; i++) {
    es.push(0);
  }
  for (let i = 0; i < groups.length; i++) {
    for (let j = 0; j < groups[i].length; j++) {
      const point = groups[i][j];
      es[i] += point.value;
    }
  }
  for (let i = 0; i < groups.length; i++) {
    es[i] = es[i] / groups[i].length;
  }
  return es;
}

export = { IFocus, getOriginalEstimates };
