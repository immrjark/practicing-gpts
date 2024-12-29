// funcion generadora https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*

export async function* prosConsStreamGeneratorUseCasen(
  prompt: string,
  abortSignal: AbortSignal
) {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
        signal: abortSignal,

        // TODO: ABORTSIGNAL
      }
    );

    if (!resp.ok) throw new Error("Error en la comparación");

    const reader = resp.body?.getReader();
    if (!reader) {
      return null;
    }
    const decoder = new TextDecoder("utf-8");
    let text = "";

    while (true) {
      const { value, done } = await reader.read();

      if (done) {
        break;
      }

      const decodedChunk = decoder.decode(value, { stream: true });
      text += decodedChunk;
      // console.log(text);
      yield text;
    }
  } catch (error) {
    return null;
  }
}
