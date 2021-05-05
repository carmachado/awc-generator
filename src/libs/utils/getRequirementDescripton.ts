import { Requirement } from "../anime/animeTypes";

const replaceLinks = (
  from: string,
  method: string,
  initialLink: string
): string => {
  return from.replace(
    new RegExp(`${method}\\('([^')]*)',[ ]*'([^')]*)'\\)`, "gi"),
    `<a target="_blank" tabindex="-1" href="${initialLink}$2">$1</a>`
  );
};

export default (req: Requirement): string => {
  if (!req.description) return req.question;

  let replace = replaceLinks(
    req.description,
    "anilink",
    "https://anilist.co/search/anime?"
  );

  replace = replaceLinks(
    replace,
    "AWCAnilist",
    "https://anilist.co/user/AWC/animelist/"
  );

  replace = replaceLinks(replace, "genlink", "");

  replace = replace.replace(
    "CURRENT_YEAR",
    new Date().getUTCFullYear().toString()
  );

  return replace;
};
