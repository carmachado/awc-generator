export default interface ChallengeInformation {
  name: string;
  user: string;
  animes: {
    requerementId: number;
    URL: string;
    fields: string[];
  }[];
}
