import React, { Component } from "react";
import Cacher from "../../services/cacher";

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.map = null;
    this.circle = null;
  }

  onScriptLoad = () => {
    const { address } = this.props;
    if (!this.map) {
      this.map = new window.google.maps.Map(this.ref.current, {
        center: { lat: 0, lng: 0 },
        zoom: 13
      });
    }

    this.getLocation(address).then(
      location => {
        this.map.setCenter(location);
        if (!this.circle) {
          this.circle = new window.google.maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            map: this.map,
            center: location,
            radius: 500
          });
        } else {
          this.circle.setCenter(location);
        }
      },
      error => {
        const infowindow = new window.google.maps.InfoWindow({
          content: "<div>This location cannot currently be displayed</div>",
          maxWidth: 300
        });
        this.map.setOptions({ disableDefaultUI: true });
        infowindow.open(this.map);
        infowindow.setPosition({ lat: 0, lng: 0 });
      }
    );
  };

  getLocation(address) {
    return new Promise((resolve, reject) => {
      const cacher = new Cacher();
      let location = cacher.getCacheValue(address);
      if (location) {
        resolve(location);
      } else {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: `${address}` }, function(results, status) {
          if (status === "OK") {
            location = results[0].geometry.location;
            cacher.setCacheValue(address, location);
            resolve(location);
          } else {
            reject("ERROR!");
          }
        });
      }
    });
  }

  componentDidMount() {
    if (!window.google) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://maps.google.com/maps/api/js?key=AIzaSyCgURx8CJ4iv_GN20xPz3Iall7r4pqwpmU`;
      var elem = document.getElementsByTagName("script")[0];
      elem.parentNode.insertBefore(script, elem);
      script.addEventListener("load", e => {
        this.onScriptLoad();
      });
    } else {
      this.onScriptLoad();
    }
  }
  componentDidUpdate(prevProps) {
    const { address } = this.props;
    if (address !== prevProps.address) {
      this.onScriptLoad();
    }
  }

  render() {
    return (
      <div
        style={{ width: "100%", height: `${this.props.height}px` }}
        ref={this.ref}
      />
    );
  }
}

export default GoogleMap;
