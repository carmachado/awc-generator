const replaceVars = async (values: unknown, input: string): Promise<string> => {
  if (!input) return "";

  let result = input;

  const matchs = input.match(/\${0,1}\{\w*\}/g);

  matchs?.forEach((match) => {
    result = result.replaceAll(match, values[match.replaceAll(/[${}]/g, "")]);
  });
  return result;
};

export default replaceVars;
