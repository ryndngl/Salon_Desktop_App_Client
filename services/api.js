// services/api.js

const API_BASE_URL = "http://192.168.100.6:5000/api";

export const servicesAPI = {
  getAllServices: async () => {
    // Desktop: Include disabled styles
    const response = await fetch(`${API_BASE_URL}/services?includeDisabled=true`);
    return response.json();
  },

  addStyle: async (serviceName, categoryName, styleData) => {
    const response = await fetch(
      `${API_BASE_URL}/services/${serviceName}/styles`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          categoryName,
          style: styleData
        }),
      }
    );
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

  deleteStyle: async (serviceId, categoryName, styleId) => {
  const response = await fetch(
    `${API_BASE_URL}/services/${serviceId}/categories/${categoryName}/styles/${styleId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }
  );
  return response.json();
},
};