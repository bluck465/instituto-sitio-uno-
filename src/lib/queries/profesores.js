import { supabase } from '../supabaseClient';

export const profesoresQueries = {
  async getAll() {
    const { data, error } = await supabase
      .from('profesores')
      .select('*, usuarios!inner(id, email, rol, activo)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('profesores')
      .select('*, usuarios!inner(id, email, rol, activo)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async getByUsuarioId(usuarioId) {
    const { data, error } = await supabase
      .from('profesores')
      .select('*')
      .eq('usuario_id', usuarioId)
      .single();
    if (error) throw error;
    return data;
  },

  async getApproved() {
    const { data, error } = await supabase
      .from('profesores')
      .select('*')
      .eq('aprobado', true);
    if (error) throw error;
    return data;
  },

  async getPending() {
    const { data, error } = await supabase
      .from('profesores')
      .select('*, usuarios!inner(id, email, rol, activo)')
      .eq('aprobado', false)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async create(profesor) {
    const { data, error } = await supabase
      .from('profesores')
      .insert(profesor)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('profesores')
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

  async reject(id) {
    return this.update(id, { aprobado: false });
  },

  async count() {
    const { count, error } = await supabase
      .from('profesores')
      .select('*', { count: 'exact', head: true });
    if (error) throw error;
    return count;
  }
};
