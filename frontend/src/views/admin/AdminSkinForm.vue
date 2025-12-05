<template>
  <div class="admin-skin-form">
    <AdminSidebar />
    <div class="admin-content">
      <header class="admin-header">
        <div class="header-content">
          <div>
            <h1 class="page-title">{{ isEdit ? 'Editar Skin' : 'Adicionar Skin' }}</h1>
            <p class="page-subtitle">{{ isEdit ? 'Atualize as informações da skin' : 'Preencha os dados para criar uma nova skin' }}</p>
          </div>
          <router-link to="/a/i" class="back-link">
            ← Voltar
          </router-link>
        </div>
      </header>

      <main class="admin-main">
        <div class="container">
          <div class="form-wrapper">
            <!-- Success/Error Messages -->
            <div v-if="error" class="alert alert-error">
              <svg class="alert-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 17H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.29 3.86L1.82 18C1.64543 18.3024 1.55299 18.6453 1.55201 18.9945C1.55103 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7238C2.83871 20.9009 3.18082 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.9009 21.4623 20.7238C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5318 3.56622 13.2807 3.32311 12.9812 3.15447C12.6817 2.98584 12.3438 2.89725 12 2.89725C11.6562 2.89725 11.3183 2.98584 11.0188 3.15447C10.7193 3.32311 10.4682 3.56622 10.29 3.86Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>{{ error }}</span>
            </div>
            
            <div v-if="success" class="alert alert-success">
              <svg class="alert-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>{{ success }}</span>
            </div>

            <form @submit.prevent="submitForm" class="form">
              <div class="form-grid">
                <!-- Left Column -->
                <div class="form-column">
                  <div class="form-section">
                    <h3 class="section-title">Informações Básicas</h3>
                    
                    <div class="form-group">
                      <label class="form-label">
                        Nome da Skin <span class="required">*</span>
                      </label>
                      <input 
                        type="text" 
                        v-model="form.name" 
                        required 
                        class="form-input"
                        placeholder="Ex: Arcana do Invoker"
                      />
                    </div>

                    <div class="form-group">
                      <label class="form-label">
                        Herói <span class="required">*</span>
                      </label>
                      <select v-model="form.heroId" required class="form-select">
                        <option value="">Selecione um herói</option>
                        <option v-for="hero in heroes" :key="hero.id" :value="hero.id">
                          {{ hero.name }}
                        </option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label class="form-label">
                        Raridade <span class="required">*</span>
                      </label>
                      <select v-model="form.rarity" required class="form-select">
                        <option value="">Selecione uma raridade</option>
                        <option v-for="rarity in rarities" :key="rarity" :value="rarity">
                          {{ rarity }}
                        </option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label class="form-label">
                        Valor (R$) <span class="required">*</span>
                      </label>
                      <input
                        type="number"
                        v-model="form.value"
                        required
                        step="0.01"
                        min="0"
                        class="form-input"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                <!-- Right Column -->
                <div class="form-column">
                  <div class="form-section">
                    <h3 class="section-title">Imagem</h3>
                    
                    <div class="form-group">
                      <label class="form-label">
                        Imagem da Skin <span class="required" v-if="!isEdit">*</span>
                      </label>
                      
                      <div class="image-upload-area" 
                           @click="$refs.fileInput.click()"
                           @dragover.prevent
                           @drop.prevent="handleDrop">
                        <input 
                          ref="fileInput"
                          type="file"
                          @change="handleFileChange"
                          accept="image/*"
                          :required="!isEdit"
                          class="file-input"
                        />
                        
                        <div v-if="!file && !form.imageUrl" class="upload-placeholder">
                          <svg class="upload-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <p>Clique ou arraste uma imagem aqui</p>
                          <span class="upload-hint">PNG, JPG, WEBP até 5MB</span>
                        </div>
                        
                        <div v-else class="image-preview-container">
                          <img 
                            :src="imagePreview || getImageUrl(form.imageUrl)" 
                            alt="Preview" 
                            class="image-preview"
                          />
                          <button 
                            type="button"
                            @click.stop="clearImage"
                            class="remove-image-btn"
                          >
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div v-if="form.imageUrl && !file" class="current-image-info">
                      <p class="info-text">Imagem atual será mantida</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-actions">
                <button 
                  type="submit" 
                  class="btn-primary" 
                  :disabled="loading"
                >
                  <span v-if="loading" class="btn-spinner"></span>
                  <span v-else>{{ isEdit ? 'Atualizar Skin' : 'Criar Skin' }}</span>
                </button>
                <router-link to="/a/i" class="btn-secondary">
                  Cancelar
                </router-link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import AdminSidebar from '../../components/admin/AdminSidebar.vue';
import { adminService } from '../../services/adminService';
import { heroService } from '../../services/heroService';

export default {
  name: 'AdminSkinForm',
  components: {
    AdminSidebar
  },
  data() {
    return {
      form: {
        name: '',
        heroId: '',
        rarity: '',
        value: '',
        imageUrl: ''
      },
      heroes: [],
      rarities: ['Comum', 'Incomum', 'Raro', 'Mítico', 'Lendário', 'Arcana', 'Imortal'],
      file: null,
      imagePreview: null,
      loading: false,
      error: null,
      success: null
    }
  },
  computed: {
    isEdit() {
      return !!this.$route.params.id;
    }
  },
  async mounted() {
    await this.loadHeroes();
    if (this.isEdit) {
      await this.loadSkin();
    }
  },
  methods: {
    async loadHeroes() {
      try {
        const response = await heroService.getAll();
        this.heroes = response.data;
      } catch (error) {
        console.error('Erro ao carregar heróis:', error);
      }
    },
    async loadSkin() {
      try {
        const response = await adminService.getSkins();
        const skin = response.data.find(s => s.id === this.$route.params.id);
        if (skin) {
          this.form = {
            name: skin.name,
            heroId: skin.heroId,
            rarity: skin.rarity,
            value: skin.value,
            imageUrl: skin.imageUrl
          };
        }
      } catch (error) {
        this.error = 'Erro ao carregar skin';
        console.error(error);
      }
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          this.error = 'A imagem deve ter no máximo 5MB';
          return;
        }
        this.file = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
        this.error = null;
      }
    },
    handleDrop(event) {
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        this.$refs.fileInput.files = event.dataTransfer.files;
        this.handleFileChange({ target: { files: [file] } });
      }
    },
    clearImage() {
      this.file = null;
      this.imagePreview = null;
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = '';
      }
    },
    getImageUrl(url) {
      if (!url) return '/placeholder-skin.jpg';
      if (url.startsWith('http')) return url;
      return `http://localhost:3000${url}`;
    },
    async submitForm() {
      this.loading = true;
      this.error = null;
      this.success = null;

      try {
        const formData = new FormData();
        formData.append('name', this.form.name);
        formData.append('heroId', this.form.heroId);
        formData.append('rarity', this.form.rarity);
        formData.append('value', this.form.value);
        
        if (this.file) {
          console.log('Anexando arquivo:', this.file.name, this.file.size, this.file.type);
          formData.append('image', this.file);
        } else if (this.form.imageUrl && !this.isEdit) {
          console.log('Usando imageUrl existente:', this.form.imageUrl);
          formData.append('imageUrl', this.form.imageUrl);
        } else if (!this.isEdit) {
          this.error = 'Por favor, selecione uma imagem';
          this.loading = false;
          return;
        }

        console.log('Enviando FormData...');
        if (this.isEdit) {
          await adminService.updateSkin(this.$route.params.id, formData);
          this.success = 'Skin atualizada com sucesso!';
          setTimeout(() => {
            this.$router.push('/a/i');
          }, 1500);
        } else {
          await adminService.createSkin(formData);
          this.success = 'Skin criada com sucesso!';
          setTimeout(() => {
            this.$router.push('/a/i');
          }, 1500);
        }
      } catch (error) {
        console.error('Erro ao salvar skin:', error);
        this.error = error.response?.data?.error || 'Erro ao salvar skin';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.admin-skin-form {
  min-height: 100vh;
  display: flex;
  background: var(--color-dark);
}

.admin-content {
  flex: 1;
  margin-left: 280px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: margin-left 0.3s ease;
}

body.sidebar-collapsed .admin-content {
  margin-left: 80px;
}

.admin-header {
  width: 100%;
  background: linear-gradient(135deg, 
    var(--color-dark-secondary) 0%, 
    var(--color-dark-tertiary) 100%);
  border-bottom: 1px solid var(--color-border);
  padding: 24px 40px;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 4px 0;
}

.page-subtitle {
  color: var(--color-text-secondary);
  font-size: 14px;
  margin: 0;
}

.back-link {
  color: var(--color-text);
  text-decoration: none;
  padding: 10px 20px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition: all 0.2s ease;
}

.back-link:hover {
  background: var(--color-dark-tertiary);
  border-color: var(--color-gold);
  color: var(--color-gold);
}

.admin-main {
  flex: 1;
  padding: 40px;
  overflow-y: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.form-wrapper {
  background: linear-gradient(135deg, 
    var(--color-dark-secondary) 0%, 
    var(--color-dark-tertiary) 100%);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 40px;
}

/* Alerts */
.alert {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  font-weight: 500;
}

.alert-error {
  background: rgba(198, 40, 40, 0.1);
  border: 1px solid var(--color-red);
  color: var(--color-red);
}

.alert-success {
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid #4caf50;
  color: #4caf50;
}

.alert-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: currentColor;
}

/* Form */
.form {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-gold);
  margin: 0 0 8px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--color-border);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  color: var(--color-text);
  font-weight: 600;
  font-size: 14px;
}

.required {
  color: var(--color-red);
}

.form-input,
.form-select {
  padding: 14px 16px;
  background: var(--color-dark);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  color: var(--color-text);
  font-size: 16px;
  transition: all 0.2s ease;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: var(--color-gold);
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
}

.form-select {
  cursor: pointer;
}

/* Image Upload */
.image-upload-area {
  position: relative;
  min-height: 300px;
  border: 2px dashed var(--color-border);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--color-dark);
  overflow: hidden;
}

.image-upload-area:hover {
  border-color: var(--color-gold);
  background: rgba(255, 215, 0, 0.05);
}

.file-input {
  display: none;
}

.upload-placeholder {
  text-align: center;
  padding: 40px;
}

.upload-icon {
  width: 64px;
  height: 64px;
  display: block;
  margin: 0 auto 16px;
  color: var(--color-text-tertiary);
  opacity: 0.5;
}

.upload-placeholder p {
  color: var(--color-text);
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.upload-hint {
  color: var(--color-text-secondary);
  font-size: 14px;
}

.image-preview-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 300px;
}

.image-preview {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
}

.remove-image-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  background: var(--color-red);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(198, 40, 40, 0.4);
}

.remove-image-btn svg {
  width: 20px;
  height: 20px;
}

.remove-image-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(198, 40, 40, 0.6);
}

.current-image-info {
  margin-top: 12px;
  padding: 12px;
  background: rgba(255, 215, 0, 0.05);
  border: 1px solid var(--color-border-gold);
  border-radius: 8px;
}

.info-text {
  color: var(--color-text-secondary);
  font-size: 13px;
  margin: 0;
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
}

.btn-primary,
.btn-secondary {
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
  color: var(--color-dark);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  background: var(--color-dark-tertiary);
  border-color: var(--color-gold);
  color: var(--color-gold);
}

.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--color-dark);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 1024px) {
  .admin-content {
    margin-left: 80px;
  }
  
  body.sidebar-collapsed .admin-content {
    margin-left: 80px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .admin-content {
    margin-left: 0;
  }

  .admin-header {
    padding: 20px;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .admin-main {
    padding: 20px;
  }

  .form-wrapper {
    padding: 24px;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }
}
</style>
