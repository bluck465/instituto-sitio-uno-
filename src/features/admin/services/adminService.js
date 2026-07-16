import { supabase } from '../../../lib/supabaseClient'

export const adminService = {
  async getUsers() {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .order('email')
    if (error) throw error
    return data
  },

  async updateUserRole(userId, newRole) {
    const { error } = await supabase
      .from('usuarios')
      .update({ rol: newRole })
      .eq('id', userId)
    if (error) throw error
  },

  async toggleUserActive(userId, activo) {
    const { error } = await supabase
      .from('usuarios')
      .update({ activo })
      .eq('id', userId)
    if (error) throw error
  },
}
