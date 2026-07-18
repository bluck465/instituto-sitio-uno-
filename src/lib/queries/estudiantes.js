import { supabase } from '../supabaseClient';

export const estudiantesQueries = {
  async getAll() {
    const { data, error } = await supabase
      .from('estudiantes')
      .select('*, usuarios!inner(id, email, rol, activo)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('estudiantes')
      .select('*, usuarios!inner(id, email, rol, activo)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async getByUsuarioId(usuarioId) {
    const { data, error } = await supabase
      .from('estudiantes')
      .select('*')
      .eq('usuario_id', usuarioId)
      .single();
    if (error) throw error;
    return data;
  },

  async create(estudiante) {
    const { data, error } = await supabase
      .from('estudiantes')
      .insert(estudiante)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('estudiantes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getEnrolled() {
    const { data, error } = await supabase
      .from('estudiantes')
      .select('*')
      .eq('estado_matricula', 'activo');
    if (error) throw error;
    return data;
  },

  async count() {
    const { count, error } = await supabase
      .from('estudiantes')
      .select('*', { count: 'exact', head: true });
    if (error) throw error;
    return count;
  }
};
