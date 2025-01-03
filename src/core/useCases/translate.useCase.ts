import { TranslateResponse } from "../../interfaces/translate.response";

export const translateTextUseCase = async (prompt: string, lang: string) => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, lang }),
    });

    if (!resp.ok) throw new Error("Error en la traducción");

    const data = (await resp.json()) as TranslateResponse;
    // console.log(data);

    return {
      ok: true,
      message: data.message,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "Error with translate",
    };
  }
};
