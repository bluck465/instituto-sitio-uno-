import { supabase } from '../supabaseClient';

export const seccionesQueries = {
  async getAll() {
    const { data, error } = await supabase
      .from('secciones')
      .select('*, asignaturas(*), profesores(*, usuarios!inner(email)), periodos_lectivos(*)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('secciones')
      .select('*, asignaturas(*), profesores(*, usuarios!inner(email)), periodos_lectivos(*)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async getByPeriodo(periodoId) {
    const { data, error } = await supabase
      .from('secciones')
      .select('*, asignaturas(*), profesores(*, usuarios!inner(email))')
      .eq('periodo_id', periodoId)
      .order('horario');
    if (error) throw error;
    return data;
  },

  async getByProfesor(profesorId) {
    const { data, error } = await supabase
      .from('secciones')
      .select('*, asignaturas(*), periodos_lectivos(*)')
      .eq('profesor_id', profesorId);
    if (error) throw error;
    return data;
  },

  async create(seccion) {
    const { data, error } = await supabase
      .from('secciones')
      .insert(seccion)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('secciones')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from('secciones')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async count() {
    const { count, error } = await supabase
      .from('secciones')
      .select('*', { count: 'exact', head: true });
    if (error) throw error;
    return count;
  }
};
