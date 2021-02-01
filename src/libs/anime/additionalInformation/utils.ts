import { AdditionalInformationFields, getField } from "../animeTypes";

export const runAfter = async (
  values: unknown,
  field: AdditionalInformationFields
): Promise<string> => {
  if (!field.runAfter) return "";

  let result = field.runAfter;

  const matchs = field.runAfter.match(/\$\{\w*\}/g);

  matchs?.forEach((match) => {
    result = result.replaceAll(match, values[match.replaceAll(/[${}]/g, "")]);
  });
  return result;
};

export const formatReturn = async (
  field: AdditionalInformationFields,
  obj: unknown,
  text: string
): Promise<string> => {
  return `${getField(field)}${text}${await runAfter(obj, field)}`;
};
