import { supabase } from '../supabaseClient';

export const periodosQueries = {
  async getAll() {
    const { data, error } = await supabase
      .from('periodos_lectivos')
      .select('*')
      .order('fecha_inicio', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('periodos_lectivos')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async getActive() {
    const { data, error } = await supabase
      .from('periodos_lectivos')
      .select('*')
      .eq('activo', true)
      .single();
    if (error) throw error;
    return data;
  },

  async create(periodo) {
    const { data, error } = await supabase
      .from('periodos_lectivos')
      .insert(periodo)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('periodos_lectivos')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async activate(id) {
    await supabase
      .from('periodos_lectivos')
      .update({ activo: false })
      .eq('activo', true);
    return this.update(id, { activo: true });
  },

  async count() {
    const { count, error } = await supabase
      .from('periodos_lectivos')
      .select('*', { count: 'exact', head: true });
    if (error) throw error;
    return count;
  }
};
