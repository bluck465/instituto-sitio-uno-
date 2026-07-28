import { supabase } from '../supabaseClient';

export const carrerasQueries = {
  async getAll() {
    const { data, error } = await supabase
      .from('carreras')
      .select('*')
      .order('codigo');
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('carreras')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async getByCodigo(codigo) {
    const { data, error } = await supabase
      .from('carreras')
      .select('*')
      .eq('codigo', codigo)
      .single();
    if (error) throw error;
    return data;
  },

  async search(query) {
    const { data, error } = await supabase
      .from('carreras')
      .select('*')
      .or(`nombre.ilike.%${query}%,codigo.ilike.%${query}%`)
      .order('codigo');
    if (error) throw error;
    return data;
  },

  async create(carrera) {
    const { data, error } = await supabase
      .from('carreras')
      .insert(carrera)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('carreras')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from('carreras')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async count() {
    const { count, error } = await supabase
      .from('carreras')
      .select('*', { count: 'exact', head: true });
    if (error) throw error;
    return count;
  }
};
