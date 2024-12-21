interface Options {
  propmt: string;
}

export const orthographyCheckUseCase = async (options: Options) => {
  const { propmt } = options;
  return {
    prompt: propmt,
    apiKey: process.env.OPENAI_API_KEY,
  };
};
