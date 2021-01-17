interface Response {
  name: string;
}

export default async (): Promise<string[]> => {
  const resPage = await fetch(
    `https://api.github.com/repos/carmachado/awc-generator-json/contents/`
  );

  const dataPage = await resPage.json();

  return (dataPage as Response[])
    .filter((res) => res.name.endsWith(".json"))
    .map((res) => res.name.replace(".json", " "));
};
