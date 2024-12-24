import OpenAI from 'openai';

interface Options {
  propmt: string;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { propmt } = options;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    temperature: 0.3,
    max_tokens: 100,
    messages: [
      {
        role: 'system',
        content: `
          Te serán proveídos textos en español de personas que están aprendiendo el idioma con posibles errores ortográficos y gramaticales.
          Debes actuar como un profesor nativo español para ayudar a las personas a mejorar su español a través de la correcciión de los textos que ellos te proporcionen.
          Debes responder en formato JSON.

          Si no ha cometido ningún error, por favor, dale las felicitaciones.

          Ejemplo de respuesta:
          { 
            "userScore": number,
            "errors": "string"[], // ['error -> solución]
            "message": "string", // Usa algún que otro emoji pero sin pasarte y sé amable.
          }
        `,
      }, // este es el rol que quieres darle a GPT
      { role: 'user', content: propmt }, // el prompt es lo que se le va a enviar a GPT
    ],
  });

  console.log(completion);

  // console.log(completion);
  const jsonResp = JSON.parse(completion.choices[0].message.content); // esto es lo que me interesa, la respuesta de GPT

  return jsonResp;
};
