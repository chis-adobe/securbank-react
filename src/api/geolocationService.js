const GOOGLE_MAPS_API_KEY = 'AIzaSyCnUV-FDw-glldZdXTSu4vcW2L4NrmHNsQ';

// Get user's current position using browser geolocation
const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Geolocation successful:', position.coords);
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMessage = 'Geolocation failed';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Geolocation permission denied';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Position information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Geolocation request timed out';
            break;
          default:
            errorMessage = `Geolocation error: ${error.message}`;
        }
        
        reject(new Error(errorMessage));
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
    console.log('Calling Google Maps API:', url);
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('Google Maps API response:', data);
    
    if (data.status === 'OK' && data.results.length > 0) {
      const addressComponents = data.results[0].address_components;
      
      // Find the city (locality) component
      const cityComponent = addressComponents.find(component => 
        component.types.includes('locality')
      );
      
      if (cityComponent) {
        console.log('Found city:', cityComponent.long_name);
        return cityComponent.long_name;
      }
      
      // Fallback: try to find administrative_area_level_1 (state/province)
      const stateComponent = addressComponents.find(component => 
        component.types.includes('administrative_area_level_1')
      );
      
      if (stateComponent) {
        console.log('Found state/province:', stateComponent.long_name);
        return stateComponent.long_name;
      }
    }
    
    if (data.status === 'REQUEST_DENIED') {
      throw new Error(`Google Maps API request denied: ${data.error_message || 'Check API key and billing'}`);
    }
    
    if (data.status === 'OVER_QUERY_LIMIT') {
      throw new Error('Google Maps API quota exceeded');
    }
    
    throw new Error(`Google Maps API error: ${data.status} - Could not determine city from coordinates`);
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    throw new Error(`Geocoding failed: ${error.message}`);
  }
};

// Main function to get user's city
export const getUserCity = async () => {
  try {
    console.log('Starting geolocation process...');
    const position = await getCurrentPosition();
    console.log('Got position, reverse geocoding...');
    const city = await reverseGeocode(position.latitude, position.longitude);
    console.log('Successfully got city:', city);
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