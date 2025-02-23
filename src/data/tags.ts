export const yearTags = ['2021', '2022', '2023'] as const;
export const typeTags = ['TA', 'TF'] as const;
export const formatTags = ['MC', 'Written'] as const;
export const filterTags = ['All', ...typeTags, ...yearTags, ...formatTags] as const;

export type YearTag = typeof yearTags[number];
export type TypeTag = typeof typeTags[number];
export type FormatTag = typeof formatTags[number];
export type FilterTag = typeof filterTags[number];