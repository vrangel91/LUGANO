import api from './api';

export const adminService = {
  login(username, password) {
    return api.post('/admin/login', { username, password });
  },
  
  verify() {
    return api.get('/admin/verify');
  },
  
  getSkins() {
    return api.get('/admin/skins');
  },
  
  createSkin(formData) {
    return api.post('/admin/skins', formData);
  },
  
  updateSkin(id, formData) {
    return api.put(`/admin/skins/${id}`, formData);
  },
  
  deleteSkin(id) {
    return api.delete(`/admin/skins/${id}`);
  },
  
  createHero(name) {
    return api.post('/admin/heroes', { name });
  },
  
  deleteHero(id) {
    return api.delete(`/admin/heroes/${id}`);
  },
  
  getHealth() {
    return api.get('/health', { baseURL: '/api' });
  }
};

