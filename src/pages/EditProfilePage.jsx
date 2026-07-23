import { ProfileLayout } from '../features/profile/components/ProfileLayout'
import { EditProfileForm } from '../features/profile/components/EditProfileForm'

export function EditProfilePage() {
  return (
    <ProfileLayout
      title="Editar perfil"
      subtitle="Actualiza tus datos personales."
    >
      <EditProfileForm />
    </ProfileLayout>
  )
}
