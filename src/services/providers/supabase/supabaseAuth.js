import { supabase } from '../../../lib/supabaseClient'
import { authContract } from '../../contracts/authContract'

export const supabaseAuth = {
  ...authContract,

  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return {
      user: {
        id: data.user.id,
        email: data.user.email,
        rol: data.user.user_metadata?.rol || 'estudiante',
        activo: data.user.user_metadata?.activo ?? true,
      },
      token: data.session.access_token,
    }
  },

  async register(payload) {
    const rol = payload.rol || 'estudiante'
    const activo = payload.activo !== undefined ? payload.activo : true

    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: { rol, activo },
        emailRedirectTo: `https://institutositiouno.vercel.app/auth/callback?rol=${rol}`,
      },
    })

    if (error) throw error

    const { error: userError } = await supabase.from('usuarios').upsert({
      id: data.user.id,
      email: payload.email,
      rol,
      activo,
    }, { onConflict: 'id' })
    if (userError) throw userError

    return this.login(payload.email, payload.password)
  },

  async saveProfile(rol, profileData) {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError) throw authError

    const table = rol === 'estudiante' ? 'estudiantes'
      : rol === 'profesor' ? 'profesores'
      : 'administradores'

    const { data: existing } = await supabase
      .from(table)
      .select('usuario_id')
      .eq('usuario_id', user.id)
      .maybeSingle()

    if (existing) {
      const { error } = await supabase
        .from(table)
        .update(profileData)
        .eq('usuario_id', user.id)
      if (error) throw error
    } else {
      const { error } = await supabase
        .from(table)
        .insert({ usuario_id: user.id, ...profileData })
      if (error) throw error
    }
  },

  async getProfile(rol) {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError) throw authError

    const table = rol === 'estudiante' ? 'estudiantes'
      : rol === 'profesor' ? 'profesores'
      : 'administradores'

    const { data, error } = await supabase.from(table).select('*').eq('usuario_id', user.id).maybeSingle()
    if (error) throw error
    return data
  },

  async logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },
}
