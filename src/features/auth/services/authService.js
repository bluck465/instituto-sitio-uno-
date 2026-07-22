import { db } from '../../../services'

export async function loginUser({ email, password }) {
  return db.auth.login(email, password)
}

export async function registerUser(payload) {
  return db.auth.register(payload)
}

export async function saveProfileUser(rol, profileData) {
  return db.auth.saveProfile(rol, profileData)
}

export async function getProfileUser(rol) {
  return db.auth.getProfile(rol)
}

export async function logoutUser() {
  return db.auth.logout()
}
