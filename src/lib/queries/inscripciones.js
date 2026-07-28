import { supabase } from '../supabaseClient';

export const inscripcionesQueries = {
  async getAll() {
    const { data, error } = await supabase
      .from('inscripciones')
      .select('*, estudiantes(*, usuarios!inner(email)), secciones(*, asignaturas(*), periodos_lectivos(*))')
      .order('id', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('inscripciones')
      .select('*, estudiantes(*, usuarios!inner(email)), secciones(*, asignaturas(*), periodos_lectivos(*)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async getByEstudiante(estudianteId) {
    const { data, error } = await supabase
      .from('inscripciones')
      .select('*, secciones(*, asignaturas(*), profesores(*, usuarios!inner(email)), periodos_lectivos(*)')
      .eq('estudiante_id', estudianteId)
      .order('id', { ascending: false });
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
      .from('secciones')
      .select('id')
      .eq('periodo_id', periodoId);
    if (error) throw error;

    const seccionIds = (data || []).map(s => s.id);
    if (seccionIds.length === 0) return [];

    const { data: inscripciones, error: inscError } = await supabase
      .from('inscripciones')
      .select('*, estudiantes(*, usuarios!inner(email)), secciones(*, asignaturas(*))')
      .in('seccion_id', seccionIds)
      .order('id', { ascending: false });
    if (inscError) throw inscError;
    return inscripciones;
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
