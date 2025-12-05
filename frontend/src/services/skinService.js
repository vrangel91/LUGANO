import api from './api';

export const skinService = {
  getAll(filters = {}) {
    const params = new URLSearchParams();
    if (filters.hero) params.append('hero', filters.hero);
    if (filters.rarity) params.append('rarity', filters.rarity);
    if (filters.minValue) params.append('minValue', filters.minValue);
    if (filters.maxValue) params.append('maxValue', filters.maxValue);
    
    return api.get(`/skins?${params.toString()}`);
  },
  
  getById(id) {
    return api.get(`/skins/${id}`);
  }
};

