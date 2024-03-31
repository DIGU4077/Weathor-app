import React from 'react';
import './Weathor.css';
import searchicon from '../Assetse/Assets/search.png';
import cloudicon from '../Assetse/Assets/cloud.png';
import humidityIcon from '../Assetse/Assets/humidity.png';
import windIcon from '../Assetse/Assets/wind.png';

export default function Weathor() {
    let api_key = "e7a64beb4b133341321c8ca3fb6976e1";

    const search = async () => {
        const element = document.getElementsByClassName("cityinput")[0];
        const cityName = element.value.trim(); // Get the trimmed value of the input

        if (cityName === "") {
            return; // Do nothing if the input is empty
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`;
            const response = await fetch(url);
            const data = await response.json();

            // Check if data is returned successfully
            if (data.cod !== 200) {
                console.error("Error:", data.message);
                return;
            }

            // Update UI with weather data
            const humidityElement = document.getElementsByClassName("humidity")[0];
            const windElement = document.getElementsByClassName("wind-rate")[0];
            const temperatureElement = document.getElementsByClassName("weathor-temp")[0];
            const locationElement = document.getElementsByClassName("weathor-location")[0];

            humidityElement.textContent = data.main.humidity;
            windElement.textContent = data.wind.speed;
            temperatureElement.textContent = data.main.temp;
            locationElement.textContent = data.name;

        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    return (
        <div className='container'>
            <div className='topbar'>
                <input type='text' className='cityinput' placeholder='Enter city'></input>
                <div className='searchicon' onClick={search}>
                    <img src={searchicon} alt='search icon'></img>
                </div>
            </div> 
            <div className='Weathor-image'>
                <img src={cloudicon} alt='cloud icon'></img>
            </div>
            <div className='weathor-temp'>24 C</div>
            <div className='weathor-location'>London</div>
            <div className='Data-container'>
                <div className='element'>
                    <img src={humidityIcon} alt='' className='icon' />
                    <div className='data'>
                        <div className='humidity'>64 %</div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>
                <div className='element'>
                    <img src={windIcon} alt='' className='icon' />
                    <div className='data'>
                        <div className='wind-rate'>18 km/h</div>
                        <div className='text'>Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
