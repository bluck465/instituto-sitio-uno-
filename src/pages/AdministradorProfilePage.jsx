import { ProfileLayout } from '../features/profile/components/ProfileLayout'
import { AdministradorProfileForm } from '../features/profile/components/AdministradorProfileForm'

export function AdministradorProfilePage() {
  return (
    <ProfileLayout
      title="Completa tu perfil"
      subtitle="Necesitamos tus datos personales para completar tu registro como administrador."
    >
      <AdministradorProfileForm />
    </ProfileLayout>
  )
}
