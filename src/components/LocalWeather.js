import React,{Component}from 'react';
import './LocalWeather.css';
import config from '../settings/secrets.json'

class LocalWeather extends Component {

    state = {
        location: '',
        temperature: '',
        humidity: '',
        condition: ''
    }

    componentDidMount() {
        this.getLocalWeather()
    }

    getLocalWeather =() => {
        let latitude;
        let longtitude;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition( position => {
                latitude = position.coords.latitude;
                longtitude = position.coords.longitude;
                const API_KEY_2  = config.API_KEY_2
                let proxy = 'https://cors-anywhere.herokuapp.com/'
                let API = `${proxy}https://api.darksky.net/forecast/${API_KEY_2}/${latitude},${longtitude}`
                fetch(API)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.timezone) {
                            this.setState({
                                location: data.timezone,
                                temperature: data.currently.temperature,
                                humidity: data.currently.humidity,
                                condition: data.currently.summary
                            })
                        } else {
                            this.setState({error: 'Not Found'})
                        }
                    })
            })
        }
    }


    render() {

        const {location, temperature, humidity, condition} = this.state;
        const celsius = Math.round((temperature - 32) * (5/9),3)
        return (
            <div className='display'>
                <h1>Local Weather</h1>
                <p>Timezone: <span>{location}</span></p>
                <p>Temperature:<span>{celsius} °C / {Math.round(temperature)} °F </span> </p>
                <p>Humidity: <span>{humidity *100} %</span> </p>
                <p>Conditions: <span>{condition}</span></p>
            </div>
        );
    }
}

export default LocalWeather;
