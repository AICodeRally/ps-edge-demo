import { MultiDepartmentLayout } from '@/src/components/layout/MultiDepartmentLayout'
import { Footer } from '@/src/components/layout/Footer'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex">
        <MultiDepartmentLayout>
          {children}
        </MultiDepartmentLayout>
      </div>
      <Footer />
    </div>
  )
}
