export const getCategories = async () => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      if (!response.ok) {
        throw new Error(
          "Data fetching failed, please check your network connection"
        );
      }
      const data = await response.json();
      return { response: data };
    } catch (error) {
      return { error: error };
    }
  };
  
  export const fetchSingleProduct = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!response.ok) {
        throw new Error(
          "Data fetching failed :( , please check your network connection and reload."
        );
      }
      const data = await response.json();
      return { response: data };
    } catch (error) {
      return { error: error };
    }
  };