import type { OrtographyResponse } from "../../interfaces/orthography.response";

export const orthographyCheckUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/orthography-check`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!resp.ok) throw new Error("Error en la corrección");

    const data = (await resp.json()) as OrtographyResponse;

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message:
        "No se pudo realizar la corrección. Por favor, inténtalo de nuevo.",
    };
  }
};
