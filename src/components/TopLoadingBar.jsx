import React from 'react'
import LoadingBar from 'react-top-loading-bar';

const TopLoadingBar = ({progress, setProgress}) => {
  return (
    <div>
      <LoadingBar
        color='green'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    </div>
  )
}

export default TopLoadingBar;
