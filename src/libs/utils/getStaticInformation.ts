import fs from "fs";

export interface NavigationResponse {
  name: string;
  file?: string;
  childrens?: NavigationResponse[];
  path?: string;
}

export const getNavigationInformation = async (): Promise<
  NavigationResponse[]
> => {
  if (process.env.JSON_FOLDER) {
    const jsonString = fs.readFileSync(
      `${process.env.JSON_FOLDER}/navigation.json`,
      "utf8"
    );

    return JSON.parse(jsonString);
  }

  const resPage = await fetch(
    `https://raw.githubusercontent.com/carmachado/awc-generator-json/master/navigation.json`
  );

  return resPage.json();
};

export const getChallengeInformation = async (
  challenge: string
): Promise<unknown> => {
  if (process.env.JSON_FOLDER) {
    const jsonString = fs.readFileSync(
      `${process.env.JSON_FOLDER}/challenges/${challenge}.json`,
      "utf8"
    );

    return JSON.parse(jsonString);
  }

  const promise = await fetch(
    `https://raw.githubusercontent.com/carmachado/awc-generator-json/master/challenges/${challenge}.json`
  );

  if (promise.status === 404) return null;

  return promise.json();
};
