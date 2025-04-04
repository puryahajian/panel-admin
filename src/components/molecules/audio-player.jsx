import React from 'react'
import ReactAudioPlayer from 'react-audio-player';

function Audio({src}) {
    return (
        <ReactAudioPlayer
            src={`https://mediplant.ir${src}`}
            autoPlay
            controls
        />
    )
}

export default Audio
