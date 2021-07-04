import replaceVars from "../../utils/replaceVars";
import { AdditionalInformationFields, getField } from "../animeTypes";

export const runAfter = async (
  values: unknown,
  field: AdditionalInformationFields
): Promise<string> => {
  return replaceVars(values, field.runAfter);
};

export const formatReturn = async (
  field: AdditionalInformationFields,
  obj: unknown,
  text: string
): Promise<string> => {
  return `${getField(field)}${text}${await runAfter(obj, field)}`;
};
