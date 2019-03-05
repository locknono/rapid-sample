interface Item {
    id?: string;
    value: number;
}
declare type Group = Item[];
declare type Groups = Group[];
declare function IFocus(groups: Groups, delta: number, c: number): {
    estimates: number[];
    sampleGroups: Item[][];
};
declare function getOriginalEstimates(groups: Groups): number[];
declare const _default: {
    IFocus: typeof IFocus;
    getOriginalEstimates: typeof getOriginalEstimates;
};
export = _default;
