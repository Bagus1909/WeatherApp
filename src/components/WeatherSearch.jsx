import React, { useState, useEffect } from "react"
import { View, Button, StyleSheet } from "react-native"
import CustomTextInput from "./CustomTextInput"

const WeatherSearch = ({ searchWeather, location, setLocation }) => {
  useEffect(() => {
    console.log("Location changed:", location)
  }, [location])

  const handleSearch = () => {
    searchWeather(location)
    setLocation("")
  }

  return (
    <View>
      <CustomTextInput
        value={location}
        placeholder='Search the weather of your city'
        numberOfLines={1}
        onChange={setLocation}
      />
      <View style={styles.buttonWrapper}>
        <Button title='Search' onPress={handleSearch} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonWrapper: {
    marginTop: 20,
  },
})

export default WeatherSearch
