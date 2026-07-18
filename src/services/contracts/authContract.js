export const authContract = {
  async login(email, password) {
    throw new Error('authContract.login() no implementado en el proveedor activo')
  },

  async register(payload) {
    throw new Error('authContract.register() no implementado en el proveedor activo')
  },

  async saveProfile(rol, profileData) {
    throw new Error('authContract.saveProfile() no implementado en el proveedor activo')
  },

  async getProfile(rol) {
    throw new Error('authContract.getProfile() no implementado en el proveedor activo')
  },

  async logout() {
    throw new Error('authContract.logout() no implementado en el proveedor activo')
  },
}
