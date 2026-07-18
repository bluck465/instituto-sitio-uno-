import { supabase } from '../supabaseClient';

export const administradoresQueries = {
  async getAll() {
    const { data, error } = await supabase
      .from('administradores')
      .select('*, usuarios!inner(id, email, rol, activo)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('administradores')
      .select('*, usuarios!inner(id, email, rol, activo)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async getByUsuarioId(usuarioId) {
    const { data, error } = await supabase
      .from('administradores')
      .select('*')
      .eq('usuario_id', usuarioId)
      .single();
    if (error) throw error;
    return data;
  },

  async getPending() {
    const { data, error } = await supabase
      .from('administradores')
      .select('*, usuarios!inner(id, email, rol, activo)')
      .eq('aprobado', false)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async create(admin) {
    const { data, error } = await supabase
      .from('administradores')
      .insert(admin)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('administradores')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async approve(id) {
    return this.update(id, { aprobado: true });
  },

  async count() {
    const { count, error } = await supabase
      .from('administradores')
      .select('*', { count: 'exact', head: true });
    if (error) throw error;
    return count;
  }
};
