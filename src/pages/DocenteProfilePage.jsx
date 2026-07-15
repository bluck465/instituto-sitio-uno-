import { ProfileLayout } from '../features/profile/components/ProfileLayout'
import { DocenteProfileForm } from '../features/profile/components/DocenteProfileForm'

export function DocenteProfilePage() {
  return (
    <ProfileLayout
      title="Completa tu perfil"
      subtitle="Necesitamos tus datos personales para completar tu registro como docente."
    >
      <DocenteProfileForm />
    </ProfileLayout>
  )
}
