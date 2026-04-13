"use client"

export function FeedbackWidget() {
  return (
    <a
      href="mailto:taeshinkim11@gmail.com?subject=Feedback%20-%20Cartoon%20Translator"
      aria-label="Send feedback"
      title="Send feedback"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-200/50 hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
    >
      <span aria-hidden="true">💬</span>
      Feedback
    </a>
  )
}
