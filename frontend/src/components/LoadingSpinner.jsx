function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-8 flex flex-col items-center space-y-4">
        <div
          className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <p className="text-gray-700 font-semibold text-lg">
          Loading expenses...
        </p>
        <p className="text-gray-500 text-sm">Please wait a moment</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;
