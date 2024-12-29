import OpenAI from 'openai';
interface Options {
  prompt: string;
  lang: string;
}

export const translateUseCase = async (openai: OpenAI, options: Options) => {
  const { prompt, lang } = options;

  const resp = await openai.chat.completions.create({
    model: 'gpt-4o',
    temperature: 0.3,
    max_tokens: 100,
    messages: [
      {
        role: 'system',
        content: `
          Traduce el siguiente texto al idioma ${lang}:${prompt}
        `,
      },
      { role: 'user', content: prompt },
    ],
  });

  // console.log(resp);

  return { lang: lang, message: resp.choices[0].message.content };
};
