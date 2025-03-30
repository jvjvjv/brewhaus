export function useLocation() {
  const { geolocation } = navigator;
  const isGeolocationAvailable = !!geolocation;
  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };
  return { isGeolocationAvailable, getCurrentPosition };
}
