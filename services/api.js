// services/api.js

const API_BASE_URL = "http://192.168.100.6:5000/api";

export const servicesAPI = {
  getAllServices: async () => {
    const response = await fetch(`${API_BASE_URL}/services`);
    return response.json();
  },

  updateStyle: async (serviceId, categoryName, styleId, data) => {
    const response = await fetch(
      `${API_BASE_URL}/services/${serviceId}/categories/${categoryName}/styles/${styleId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    return response.json();
  },

  toggleStyle: async (serviceId, categoryName, styleId) => {
    const response = await fetch(
      `${API_BASE_URL}/services/${serviceId}/categories/${categoryName}/styles/${styleId}/toggle`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.json();
  },
};