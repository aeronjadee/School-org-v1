import { API_CONFIG } from '../utils/constants';

class ApiService {
  constructor() {
    this.baseHeaders = API_CONFIG.HEADERS;
  }

  async get(url) {
    const response = await fetch(url, {
      headers: this.baseHeaders
    });
    return response.json();
  }

  async post(url, body) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { ...this.baseHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return response.json();
  }

  async put(url, body) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: { ...this.baseHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return response.json();
  }

  async patch(url, body) {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: { ...this.baseHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return response.json();
  }

  async delete(url) {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: this.baseHeaders
    });
    return response.json();
  }
}

export default new ApiService();