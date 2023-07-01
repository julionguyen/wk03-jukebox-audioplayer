import { Component } from "react";
import AudioPlayer from "./AudioPlayer";
import "./Jukebox.css"

export default class Jukebox extends Component {
    state = {
        song: '',
        status: 'play'
    }
    chooseSong = (newSong) => {

        this.setState({
            song: newSong
        })        
    }
    render() {
        return (
            <div className="jukebox_main">
                <h1>Jukebox</h1>
                <p><button onClick={() => this.chooseSong('')}>Disable Audio</button></p>
                <fieldset>
                    <legend>Play song:</legend>

                    <button onClick={() => this.chooseSong('/songs/fantasy-classical.mp3')}>Fantasy Classical</button>
                    <button onClick={() => this.chooseSong('/songs/gates-of-heaven.mp3')}>Gates of Heaven</button>
                    <button onClick={() => this.chooseSong('/songs/grand-orchestra.mp3')}>Grand Orchestra</button>
                    <button onClick={() => this.chooseSong('/songs/piano-song.mp3')}>Piano Song</button>

                </fieldset>
                
                { this.state.song === '' ? <p>Audio disabled</p> : <AudioPlayer audioURL={this.state.song}/> }
            </div>
        )
    }
}