import React from 'react'

function CircleSpinner() {
  return (
    <div className="text-center">
      <div className="animate-spin inline-block w-10 h-10 border-[4px] border-current border-t-transparent text-green-700 rounded-full" role="status" aria-label="loading">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default CircleSpinner
