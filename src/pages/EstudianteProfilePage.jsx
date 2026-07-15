import { ProfileLayout } from '../features/profile/components/ProfileLayout'
import { EstudianteProfileForm } from '../features/profile/components/EstudianteProfileForm'

export function EstudianteProfilePage() {
  return (
    <ProfileLayout
      title="Completa tu perfil"
      subtitle="Necesitamos tus datos personales para completar tu registro como estudiante."
    >
      <EstudianteProfileForm />
    </ProfileLayout>
  )
}
