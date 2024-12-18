import { Character } from "./types/character";
import { pastorAndrew } from "./data/pastorAndrew";
import { grace } from "./data/grace";
import { jacob } from "./data/jacob";
import { hope } from "./data/hope";

export type { Character };

export const characters: Character[] = [
  pastorAndrew,
  grace,
  jacob,
  hope
];