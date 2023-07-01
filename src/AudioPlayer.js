import { Component } from "react"
import "./AudioPlayer.css"

const audioElement = new Audio()

export default class AudioPlayer extends Component {
  state = {
    showingPlayingStatus: '',
    currentAudioURL: '',
    duration: 0,
    currentPlayingTime: 0,
    status: "paused"
  }
  
  componentDidMount(){
    
    audioElement.src=this.props.audioURL
    audioElement.autoplay = true
    
    this.setState({
      currentAudioURL: this.props.audioURL
    })        
  }

  componentDidUpdate() {
    if (this.props.audioURL === '') {
      audioElement.pause()      
    } else if (this.props.audioURL !== this.state.currentAudioURL) {
        audioElement.src=this.props.audioURL        
        this.setState({          
          currentAudioURL: this.props.audioURL

        })                
    }    
    
    // Triggered when loadedData
    audioElement.onloadedmetadata = this.handleOnLoadedMetaData
    // Triggered when duration change
    audioElement.ondurationchange = this.handleOnDurationChange
    //Triggered when timeupdate event
    audioElement.addEventListener("timeupdate",(event)=> this.handleOnTimeUpdate())
    // Triggered when playing song
    audioElement.onplaying = this.handleOnPlaying
    // Triggered when the song has finished
    audioElement.onended = this.handleOnFinishSong    
  }
  
  componentWillUnmount() {        
    audioElement.pause()
  }

  handleOnLoadedMetaData = () => {
    
    this.setState({
      showingPlayingStatus: "Playing " + this.props.audioURL
    })
  }
  handleOnDurationChange = () => {
    this.setState({
      duration: audioElement.duration
    })
  }
  handleOnTimeUpdate = () => {
    
    this.setState({
      currentPlayingTime: audioElement.currentTime,      
    })
  }

  handlePauseOrPlay = () => {
    if (this.state.status === "paused") {
      audioElement.pause()
      this.setState({
        status: "play"
      })
    } else {
      audioElement.play()
      this.setState({
        status: "paused"
      })
    }    
  }
  handleOnPlaying = () => {
    this.setState({
      showingPlayingStatus: "Playing " + this.props.audioURL
    })
  }
  handleOnFinishSong = () => {    
    this.showFinishedSong()
  }
  
  showFinishedSong = () => {
    let newPlayingStatus = this.props.audioURL + " has stopped"
    this.setState({
      showingPlayingStatus: newPlayingStatus
    })
  }

  handlePlayingTimeChange = (event) => {
    
    let newPlayingTime = event.target.value    
    audioElement.currentTime = newPlayingTime
  }
  render() {    
    return (
      <div>
        <p>{this.state.showingPlayingStatus}</p>
        <button onClick={this.handlePauseOrPlay}>{this.state.status} </button>
        <input type="range" 
              min={0} 
              max={this.state.duration} 
              steop={0.1}
              value={this.state.currentPlayingTime}
              onChange={this.handlePlayingTimeChange}
          />
      </div>
    )
  }
}