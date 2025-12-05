import api from './api';

export const heroService = {
  getAll() {
    return api.get('/heroes');
  }
};

