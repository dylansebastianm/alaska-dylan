export async function submitLoanForm(values: any, userId: number) {
  try {
    // const response = await fetch('https://api7.cloudframework.io/recruitment/fullstack/users/4', 
    const response = await fetch(`https://api7.cloudframework.io/recruitment/fullstack/users/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-WEB-KEY": "Development",
        },
        body: JSON.stringify(values),
      });

    if (!response.ok) {
      let errorMessage = "Ha ocurrido un error desconocido.";
      try {
        const errorResponse = await response.json();
        errorMessage = errorResponse.message || errorMessage;
      } catch (error) {
        console.error("Error al parsear JSON del error:", error);
      }
      return { error: errorMessage };
    }

    const successResponse = await response.json();
    return { success: true, data: successResponse.data };
  } catch (error) {
    return { error: "Error de conexión con el servidor." };
  }
}