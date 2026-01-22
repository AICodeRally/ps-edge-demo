export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            NP Edge Demo
          </h1>
          <p className="text-xl text-gray-600">
            Nonprofit Management Platform for Arizona Friends of Foster Children Foundation
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Core Modules
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 border border-gray-200 rounded">
              <h3 className="font-semibold text-gray-900">Programs</h3>
              <p className="text-sm text-gray-600">Manage programs & projects</p>
            </div>
            <div className="p-4 border border-gray-200 rounded">
              <h3 className="font-semibold text-gray-900">Fundraising</h3>
              <p className="text-sm text-gray-600">Donors & campaigns</p>
            </div>
            <div className="p-4 border border-gray-200 rounded">
              <h3 className="font-semibold text-gray-900">Volunteers</h3>
              <p className="text-sm text-gray-600">Volunteer management</p>
            </div>
            <div className="p-4 border border-gray-200 rounded">
              <h3 className="font-semibold text-gray-900">Beneficiaries</h3>
              <p className="text-sm text-gray-600">Track impact & outcomes</p>
            </div>
            <div className="p-4 border border-gray-200 rounded">
              <h3 className="font-semibold text-gray-900">Compliance</h3>
              <p className="text-sm text-gray-600">990 forms & filings</p>
            </div>
            <div className="p-4 border border-gray-200 rounded">
              <h3 className="font-semibold text-gray-900">Events</h3>
              <p className="text-sm text-gray-600">Events & registrations</p>
            </div>
          </div>
        </div>
        <div className="mt-8 text-sm text-gray-500 text-center">
          <p>NP-Edge Demo - Port 3034</p>
          <p>Arizona Friends of Foster Children Foundation</p>
        </div>
      </div>
    </div>
  );
}
