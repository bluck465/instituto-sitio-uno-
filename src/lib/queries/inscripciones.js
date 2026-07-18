import { supabase } from '../supabaseClient';

export const inscripcionesQueries = {
  async getAll() {
    const { data, error } = await supabase
      .from('inscripciones')
      .select('*, estudiantes(*, usuarios!inner(email)), secciones(*, asignaturas(*), periodos_lectivos(*))')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('inscripciones')
      .select('*, estudiantes(*, usuarios!inner(email)), secciones(*, asignaturas(*), periodos_lectivos(*))')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async getByEstudiante(estudianteId) {
    const { data, error } = await supabase
      .from('inscripciones')
      .select('*, secciones(*, asignaturas(*), profesores(*, usuarios!inner(email)), periodos_lectivos(*))')
      .eq('estudiante_id', estudianteId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getBySeccion(seccionId) {
    const { data, error } = await supabase
      .from('inscripciones')
      .select('*, estudiantes(*, usuarios!inner(email))')
      .eq('seccion_id', seccionId);
    if (error) throw error;
    return data;
  },

  async getByPeriodo(periodoId) {
    const { data, error } = await supabase
      .from('inscripciones')
      .select('*, estudiantes(*, usuarios!inner(email)), secciones(*, asignaturas(*))')
      .eq('seccion_id', 'id')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async create(inscripcion) {
    const { data, error } = await supabase
      .from('inscripciones')
      .insert(inscripcion)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('inscripciones')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateNota(id, notaFinal) {
    return this.update(id, { nota_final: notaFinal });
  },

  async updateInasistencias(id, inasistencias) {
    return this.update(id, { inasistencias });
  },

  async delete(id) {
    const { error } = await supabase
      .from('inscripciones')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async count() {
    const { count, error } = await supabase
      .from('inscripciones')
      .select('*', { count: 'exact', head: true });
    if (error) throw error;
    return count;
  }
};
