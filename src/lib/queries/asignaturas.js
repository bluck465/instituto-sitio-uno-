import { supabase } from '../supabaseClient';

export const asignaturasQueries = {
  async getAll() {
    const { data, error } = await supabase
      .from('asignaturas')
      .select('*')
      .order('codigo');
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('asignaturas')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async getByCodigo(codigo) {
    const { data, error } = await supabase
      .from('asignaturas')
      .select('*')
      .eq('codigo', codigo)
      .single();
    if (error) throw error;
    return data;
  },

  async search(query) {
    const { data, error } = await supabase
      .from('asignaturas')
      .select('*')
      .or(`nombre.ilike.%${query}%,codigo.ilike.%${query}%`)
      .order('codigo');
    if (error) throw error;
    return data;
  },

  async create(asignatura) {
    const { data, error } = await supabase
      .from('asignaturas')
      .insert(asignatura)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('asignaturas')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from('asignaturas')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async getByCarrera(carreraId) {
    const { data, error } = await supabase
      .from('asignaturas')
      .select('*, carreras(*)')
      .eq('carrera_id', carreraId)
      .order('codigo');
    if (error) throw error;
    return data;
  },

  async count() {
    const { count, error } = await supabase
      .from('asignaturas')
      .select('*', { count: 'exact', head: true });
    if (error) throw error;
    return count;
  }
};
