const GOOGLE_MAPS_API_KEY = 'AIzaSyB5cFEO6DwkOmdGzAg-s8BiQgiFymCH1mk';

// Get user's current position using browser geolocation
const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
};

// Reverse geocode coordinates to get city name using Google Maps API
const reverseGeocode = async (latitude, longitude) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      const addressComponents = data.results[0].address_components;
      
      // Find the city (locality) component
      const cityComponent = addressComponents.find(component => 
        component.types.includes('locality')
      );
      
      if (cityComponent) {
        return cityComponent.long_name;
      }
      
      // Fallback: try to find administrative_area_level_1 (state/province)
      const stateComponent = addressComponents.find(component => 
        component.types.includes('administrative_area_level_1')
      );
      
      if (stateComponent) {
        return stateComponent.long_name;
      }
    }
    
    throw new Error('Could not determine city from coordinates');
  } catch (error) {
    throw new Error(`Geocoding failed: ${error.message}`);
  }
};

// Main function to get user's city
export const getUserCity = async () => {
  try {
    const position = await getCurrentPosition();
    const city = await reverseGeocode(position.latitude, position.longitude);
    return city;
  } catch (error) {
    console.error('Error getting user city:', error);
    throw error;
  }
};

// Fallback function to get a default city if geolocation fails
export const getDefaultCity = () => {
  return 'Vancouver'; // Fallback to Vancouver if geolocation fails
}; 