# [rapid-sampling](https://github.com/locknono/rapid-sampling)  [![GitHub license](https://camo.githubusercontent.com/890acbdcb87868b382af9a4b1fac507b9659d9bf/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d626c75652e737667)](https://github.com/locknono/leaflet-partition/blob/master/LICENSE)

This is an implementation of [Rapid sampling for visualizations with ordering guarantees](https://dl.acm.org/citation.cfm?id=2735485)



## Abstract

Visualizations are frequently used as a means to understand trends and gather insights from datasets, but often take a long time to generate. In this paper, we focus on the problem of *rapidly generating approximate visualizations while preserving crucial visual properties of interest to analysts.* **Our primary focus will be on sampling algorithms that preserve the visual property of *ordering*;** our techniques will also apply to some other visual properties. For instance, our algorithms can be used to generate an approximate visualization of a bar chart very rapidly, where the comparisons between any two bars are correct. We formally show that our sampling algorithms are generally applicable and provably optimal in theory, in that they do not take more samples than necessary to generate the visualizations with ordering guarantees. They also work well in practice, correctly ordering output groups while taking orders of magnitude fewer samples and much less time than conventional sampling schemes.



## Basic Usage

It's designed to a **UMD** module ,so you can use it both in CommonJs and browser environment. 



for example,with typescript and node.js:

```
import rapidSampling = require("rapid-sampling");

//`IFocus` is the main algorithm
const { IFocus, getOriginalEstimates } = rapidSampling;

// estimates:number[]，sampleGroups:Groups    
// see type annotations below
const { estimates, sampleGroups } = IFocus(groups, delta=0.05, c=1);
```

which `IFocus` is the main algorithm of rapid sampling,the others are just methods for estimating.

`groups` is the data you need to pass in ,which has a shape of :

```
interface Item {
  id?: string;
  value: number;
}

type Group = Item[];

type Groups = Group[];
```







## License

under [MIT license](https://github.com/locknono/leaflet-partition/blob/master/LICENSE)









