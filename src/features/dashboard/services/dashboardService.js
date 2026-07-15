import { db } from '../../../services'

export async function getDashboardData() {
  return db.academic.getDashboard()
}
