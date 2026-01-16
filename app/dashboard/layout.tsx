import { MultiDepartmentLayout } from '@/src/components/layout/MultiDepartmentLayout'
import { TopNavbar } from '@/src/components/layout/TopNavbar'
import { Footer } from '@/src/components/layout/Footer'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar />
      <div className="flex-1 flex">
        <MultiDepartmentLayout>
          {children}
        </MultiDepartmentLayout>
      </div>
      <Footer />
    </div>
  )
}
