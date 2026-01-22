import Link from 'next/link';
import { EnvelopeClosedIcon, ChatBubbleIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons';

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-24 px-6">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Legal & Support</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Privacy Policy */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-purple-600 dark:text-purple-400">Privacy Policy</h2>
            <div className="text-sm space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Demo Mode:</strong> All data is synthetic. No real personal or business data is collected or stored.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                We only use your email for session authentication, stored locally in your browser.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                No external servers, no database in synthetic mode.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Questions? <a href="mailto:privacy@aicoderally.com" className="text-purple-600 hover:underline">privacy@aicoderally.com</a>
              </p>
            </div>
          </div>

          {/* Terms of Service */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-pink-600 dark:text-pink-400">Terms of Service</h2>
            <div className="text-sm space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Demo Platform:</strong> For evaluation purposes only. Provided "as is" without warranty.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Acceptable Use:</strong>
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-xs">
                <li>Evaluation purposes only</li>
                <li>Do not input real client data</li>
                <li>All data is synthetic</li>
              </ul>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Questions? <a href="mailto:legal@aicoderally.com" className="text-pink-600 hover:underline">legal@aicoderally.com</a>
              </p>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-orange-600 dark:text-orange-400">Support</h2>
            <div className="text-sm space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
                  <EnvelopeClosedIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Email</p>
                  <a href="mailto:support@aicoderally.com" className="text-purple-600 dark:text-purple-400 hover:underline text-xs">
                    support@aicoderally.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <ChatBubbleIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Live Chat</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Available in-app</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center flex-shrink-0">
                  <QuestionMarkCircledIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Knowledge Base</p>
                  <Link href="/kb" className="text-yellow-700 dark:text-yellow-400 hover:underline text-xs">
                    Browse Articles
                  </Link>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  <strong>Demo Inquiries:</strong><br/>
                  <a href="mailto:demo@aicoderally.com" className="text-purple-600 hover:underline">demo@aicoderally.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            Last updated: January 21, 2026
          </p>
          <Link
            href="/"
            className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
