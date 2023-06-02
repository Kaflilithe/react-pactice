export const justifyItems = ["start", "end", "center", "stretch", "between"] as const;

export type JustifyItems = (typeof justifyItems)[number];
