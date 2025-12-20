import { MultiDepartmentLayout } from '@/src/components/layout/MultiDepartmentLayout'
import { OpsChiefOrb } from '@/src/components/ai/OpsChiefOrb'
import { AskPSOrb } from '@/src/components/ai/AskPSOrb'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MultiDepartmentLayout>
      {children}
      {/* AI Orbs - Floating bottom corners */}
      <OpsChiefOrb appName="PS-Edge" enabled={true} />
      <AskPSOrb appName="PS-Edge" enabled={true} />
    </MultiDepartmentLayout>
  )
}
