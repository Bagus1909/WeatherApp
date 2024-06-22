import React, { useEffect, useState } from "react"
import { BASE_URL, API_KEY } from "./src/constant"
import { Text, View, StyleSheet, ActivityIndicator } from "react-native"
import WeatherSearch from "./src/components/WeatherSearch"
import WeatherInfo from "./src/components/WeatherInfo"
import axios from "axios"

const App = () => {
  const [weatherData, setWeatherData] = useState()
  const [status, setStatus] = useState("")
  const [location, setLocation] = useState("")
  const [searchingLocation, setSearchingLocation] = useState("")

  useEffect(() => {
    if (status === "success" || status === "error") {
      setLocation("")
    }
  }, [status])

  const renderComponent = () => {
    switch (status) {
      case "loading":
        return (
          <View>
            <ActivityIndicator size='large' color='#0000ff' />
            <Text style={styles.loadingText}>Searching weather for {searchingLocation}...</Text>
          </View>
        )
      case "success":
        return (
          <WeatherInfo
            name={weatherData?.name}
            temp={weatherData?.main?.temp}
            weatherDesc={weatherData?.weather[0]?.description}
            icon={weatherData?.weather[0]?.icon}
            visibility={weatherData?.visibility}
            windSpeed={weatherData?.wind.speed}
          />
        )
      case "error":
        return <Text>Something went wrong. Please try again with a correct city name.</Text>
      default:
        return
    }
  }

  const searchWeather = location => {
    setSearchingLocation(location)
    setStatus("loading")
    axios
      .get(`${BASE_URL}?q=${location}&appid=${API_KEY}`)
      .then(response => {
        const data = response.data
        data.visibility /= 1000
        data.visibility = data.visibility.toFixed(2)
        data.main.temp -= 273.15
        data.main.temp = data.main.temp.toFixed(2)
        setWeatherData(data)
        setStatus("success")
      })
      .catch(error => {
        setStatus("error")
      })
  }

  return (
    <View style={styles.container}>
      <WeatherSearch searchWeather={searchWeather} location={location} setLocation={setLocation} />
      <View style={styles.marginTop20}>{renderComponent()}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  marginTop20: {
    marginTop: 20,
  },
  loadingText: {
    textAlign: "center",
  },
})

export default App
