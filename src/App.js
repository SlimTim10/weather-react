import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      temperature: ''
    };
  }
  
  getWeather = (event) => {
    event.preventDefault();
    
    const apiKey = 'bd06dc385ab59408ad2f37e42c6b9638';
    const rootEndpoint = `https://api.openweathermap.org/data/2.5/weather?APPID=${apiKey}`;

    const city = event.target.elements.city.value;

    const endpoint = rootEndpoint
          + `&units=metric`
          + `&q=${city}`;
    console.log('Endpoint:', endpoint);

    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        console.log(`Current weather: ${data.weather[0].description}`);
        console.log(`Current temperature: ${data.main.temp}`);
        this.setState({
          description: data.weather[0].description,
          temperature: data.main.temp
        });
      });
  }
  
  render() {
    return (
      <div>
        <aside id="ui-control">
          <h2>Enter a city name</h2>
          <form onSubmit={this.getWeather}>
            <input name="city" type="text" />
            <button id="get-weather">Get weather</button>
          </form>
        </aside>

        <main>
          <article>The weather is: <span id="current-weather">{this.state.description}</span></article>
          <article>The temperature is: <span id="current-temperature">{this.state.temperature}</span></article>
        </main>
      </div>
    );
  }
}

export default App;
