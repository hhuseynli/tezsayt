import { type Localized } from "./types";

export type TeamMember = {
  name: string;
  role: Localized;
  photo: string;
};

export const team: TeamMember[] = [
  {
    name: "Hüseyn Hüseynli",
    role: {
      az: "Həmtəsisçi və developer",
      ru: "Сооснователь и разработчик",
      en: "Co-founder & Developer",
    },
    photo: "/images/team/huseyn.jpg",
  },
  {
    name: "Nicat Hətəmli",
    role: {
      az: "Həmtəsisçi və developer",
      ru: "Сооснователь и разработчик",
      en: "Co-founder & Developer",
    },
    photo: "/images/team/nijat.jpg",
  },
];
