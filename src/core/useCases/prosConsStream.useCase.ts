export const prosConsStreamUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),

        // TODO: ABORTSIGNAL
      }
    );

    if (!resp.ok) throw new Error("Error en la comparación");

    // const data = (await resp.json()) as ProsConsResponse;
    const reader = resp.body?.getReader();
    if (!reader) {
      console.log("No se puedo generar el reader");
      return null;
    }

    return reader;
    // const decoder = new TextDecoder("utf-8");
    // let text = "";

    // while (true) {
    //   const { value, done } = await reader.read();

    //   if (done) {
    //     break;
    //   }

    //   const decodedChunk = decoder.decode(value, { stream: true });
    //   text += decodedChunk;
    //   console.log(text);
    // }

    return null;
  } catch (error) {
    return null;
  }
};
