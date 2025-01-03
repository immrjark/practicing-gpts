import OpenAI from 'openai';
import * as path from 'path';
import * as fs from 'fs';

interface Options {
  propmt: string;
  voice?: string;
}
export const textToAudioUseCase = async (openai: OpenAI, { prompt, voice }) => {
  const voices = {
    alloy: 'alloy',
    echo: 'echo',
    fable: 'fable',
    onyx: 'onyx',
    nova: 'nova',
    shimmer: 'shimmer',
  };

  const selectedVoice = voices[voice] ?? 'nova';

  const folderPath = path.resolve(__dirname, `../../../generated/audios/`);
  const speechFile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`); // el problema con esto es que si hay dos users que suben a la vez el mismo audio puede sobreescribirse por ende, podrías usar también un UUID o un user id para cada persona para tenerlo más seguro

  // await fs.promises.mkdir(folderPath, { recursive: true }); //se puede poner de ambas manera pero una te evita poner el await
  fs.mkdirSync(folderPath, { recursive: true });

  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: selectedVoice,
    input: prompt,
    response_format: 'mp3',
  });

  // console.log(mp3);

  const buffer = Buffer.from(await mp3.arrayBuffer());
  fs.writeFileSync(speechFile, buffer);

  return speechFile;
};
