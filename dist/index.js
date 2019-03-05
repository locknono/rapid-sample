(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    function IFocus(groups, delta, c) {
        var k = groups.length;
        var A = [];
        for (var i = 0; i < k; i++) {
            A.push(i);
        }
        var m = 1;
        var sampleGroups = groups.map(function (e, i) {
            var singleSample = drawOneSampleFromOneGroup(e);
            return [singleSample];
        });
        var estimates = sampleGroups.map(function (e) { return getEstimateForOneGroup(e); });
        var N = getMaxNInActiveGroups(A, groups);
        while (A.length > 0) {
            m = m + 1;
            var epsilon = getEpsilon(m, N, k, delta, c);
            for (var i = 0; i < A.length; i++) {
                var singleSample = drawOneSampleFromOneGroup(groups[A[i]]);
                sampleGroups[A[i]].push(singleSample);
                estimates[A[i]] =
                    ((m - 1) / m) * estimates[A[i]] + (1 / m) * singleSample.value;
            }
            for (var i = A.length - 1; i >= 0; i--) {
                if (ifActive(estimates, A[i], epsilon) === false) {
                    A.splice(i, 1);
                }
            }
        }
        return { estimates: estimates, sampleGroups: sampleGroups };
    }
    /**
     * get max n in active groups
     */
    function getMaxNInActiveGroups(A, groups) {
        var v = Number.MIN_VALUE;
        for (var i = 0; i < A.length; i++) {
            if (groups[A[i]].length > v)
                v = groups[A[i]].length;
        }
        return v;
    }
    function getEpsilon(m, N, k, delta, c) {
        var part1 = 1 - (m - 1) / N;
        var part2 = 2 * Math.log2(Math.log2(m));
        var part3 = Math.log2((Math.pow(Math.PI, 2) * k) / (3 * delta));
        var epsilon = c * Math.sqrt((part1 * (part2 + part3)) / (2 * m));
        return epsilon;
    }
    function drawOneSampleFromOneGroup(group) {
        var randomIndex = Math.round(Math.random() * (group.length - 1));
        var sample = group[randomIndex];
        group.splice(randomIndex, 1);
        return sample;
    }
    function getEstimateForOneGroup(group) {
        var sum = 0;
        for (var _i = 0, group_1 = group; _i < group_1.length; _i++) {
            var v = group_1[_i];
            sum += v.value;
        }
        return sum / group.length;
    }
    function ifActive(estimates, index, epsilon) {
        for (var i = 0; i < estimates.length; i++) {
            if (index === i)
                continue;
            if (estimates[index] + epsilon > estimates[i] - epsilon &&
                estimates[index] + epsilon < estimates[i] + epsilon) {
                return true;
            }
            if (estimates[index] - epsilon > estimates[i] - epsilon &&
                estimates[index] - epsilon < estimates[i] + epsilon) {
                return true;
            }
        }
        return false;
    }
    function getOriginalEstimates(groups) {
        var es = [];
        for (var i = 0; i < groups.length; i++) {
            es.push(0);
        }
        for (var i = 0; i < groups.length; i++) {
            for (var j = 0; j < groups[i].length; j++) {
                var point = groups[i][j];
                es[i] += point.value;
            }
        }
        for (var i = 0; i < groups.length; i++) {
            es[i] = es[i] / groups[i].length;
        }
        return es;
    }
    return { IFocus: IFocus, getOriginalEstimates: getOriginalEstimates };
});
