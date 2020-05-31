// Instructions to every other class
// on how they can be an argumento to 'addMarker'

export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;

  color: string = 'red';
}

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0,
      },
    });
  }
  // A class can be used as a class and as a type
  // Using the OR operator, TypeScript only allow
  // using properties that belongs to both User and Company
  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
    });

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent();
      });

      infoWindow.open(this.googleMap, marker);

    });
  }
}
