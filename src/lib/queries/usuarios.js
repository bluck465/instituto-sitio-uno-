import { supabase } from '../supabaseClient';

export const usuariosQueries = {
  async getAll() {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async getByEmail(email) {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .single();
    if (error) throw error;
    return data;
  },

  async getByRol(rol) {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('rol', rol)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getPending() {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('activo', false)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async create(usuario) {
    const { data, error } = await supabase
      .from('usuarios')
      .insert(usuario)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('usuarios')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async approve(id) {
    return this.update(id, { activo: true });
  },

  async deactivate(id) {
    return this.update(id, { activo: false });
  },

  async delete(id) {
    const { error } = await supabase
      .from('usuarios')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async count() {
    const { count, error } = await supabase
      .from('usuarios')
      .select('*', { count: 'exact', head: true });
    if (error) throw error;
    return count;
  },

  async countPending() {
    const { count, error } = await supabase
      .from('usuarios')
      .select('*', { count: 'exact', head: true })
      .eq('activo', false);
    if (error) throw error;
    return count;
  }
};
