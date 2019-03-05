(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var rapidSample = require("./index");
    var IFocus = rapidSample.IFocus, getOriginalEstimates = rapidSample.getOriginalEstimates;
    function getRelations(es) {
        var r = [];
        for (var i = 0; i < es.length; i++) {
            for (var j = i; j < es.length; j++) {
                if (es[i] > es[j]) {
                    r.push(1);
                }
                else {
                    r.push(0);
                }
            }
        }
        return r;
    }
    function compareRelations(r1, r2) {
        var count = 0;
        for (var i = 0; i < r1.length; i++) {
            if (r1[i] == r2[i]) {
                count += 1;
            }
        }
        return count / r1.length;
    }
    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
    var groupNumber = 10;
    var maxPointsCount = 100;
    var itemCount = 0;
    var groups = [];
    for (var i = 0; i < groupNumber; i++) {
        var group = [];
        for (var j = 0; j < maxPointsCount; j++) {
            if (j % 3 == 0) {
                var item = {
                    id: ++itemCount,
                    value: getRandomNumber(i / 13, i / 10)
                };
                group.push(item);
            }
            else {
                var item = {
                    id: ++itemCount,
                    value: getRandomNumber(i / 20, i / 10)
                };
                group.push(item);
            }
        }
        groups.push(group);
    }
    var rList = [];
    var c = 1;
    for (var i = 0; i < 5; i++) {
        try {
            var groups2 = JSON.parse(JSON.stringify(groups));
            var e1 = getOriginalEstimates(groups2);
            var _a = IFocus(groups2, 0.05, c), estimates = _a.estimates, sampleGroups = _a.sampleGroups;
            var r1 = getRelations(e1);
            var r2 = getRelations(estimates);
            var ratio = compareRelations(r1, r2);
            rList.push(ratio);
            console.log("sampleGroups: ", sampleGroups);
        }
        catch (e) {
            console.error("e: ", e);
        }
    }
    console.log("rList: ", rList);
});
