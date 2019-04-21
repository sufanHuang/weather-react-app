import React, { Component } from 'react';
import './App.css';
import Weather from './Weather';
import Form from './Form';
import LocalWeather from './LocalWeather';
import * as _ from 'lodash';
import config from '../config.js'

class App extends Component {

  state = {
    city: '',
    country: '',
    temp: '',
    humidity: '',
    conditions:'',
    error: ''
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const city = event.target.city.value
    const country = event.target.country.value
    const API_KEY_1  = config.API_KEY_1
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&APPID=${API_KEY_1}`

    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        if (data.name) {
          this.setState({
            city: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            humidity: data.main.humidity,
            conditions: this.formatDescription(data.weather[0].description)
          })
        } else {
          this.setState({ error: 'Not Found' })
        }
      })
    event.target.reset()
  }

  formatDescription = (description) => {
      let words = _.split(description, ' ')

      let formattedWords = _.map(words, currentWord => _.capitalize(currentWord))

      return _.join(formattedWords, ' ')
  }

  render() {
    const {city,country,temp,humidity,conditions,error}= this.state
    const fahrenheit = temp * (9/5) + 32
    return (
      <div className="app-wrapper">
        <div className='container'>
          <div className='row'>
            <div className='col-5'>
              <LocalWeather />
            </div>
            <div className='col-7'>
              <Form handleSubmit={this.handleSubmit} />
              <Weather
                city={ city }
                country={ country }
                temp={ temp }
                fahrenheit = { fahrenheit }
                humidity={ humidity }
                conditions={ conditions }
                error={ error }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
