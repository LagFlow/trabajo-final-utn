// src/services/formSubmit.js
export const submitForm = async (data) => {
  const response = await fetch(
    "https://formsubmit.co/mfigueroa@runaid.com.ar",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Error al enviar el formulario");
  }
};
