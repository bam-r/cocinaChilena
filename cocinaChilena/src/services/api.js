export const getPlatos = async () => {
    try {
        const response = await
            fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Chile');
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error en el servicio de productos:", error);
        throw error;
    }
};