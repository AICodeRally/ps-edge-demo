import { MultiDepartmentLayout } from '@/src/components/layout/MultiDepartmentLayout'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MultiDepartmentLayout>
      {children}
    </MultiDepartmentLayout>
  )
}
