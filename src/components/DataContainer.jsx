import React, { useState, useRef } from 'react';
import styles from './DataContainer.module.css';
import plus from '../assets/plus.png';
import Loader from './Loader/Loader';
import { useJsApiLoader, GoogleMap, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';

// Center object
const center = { lat: 28.7041, lng: 77.1025 };

const DataContainer = () => {
    // state variables to store data from form
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [waypoints, setWaypoints] = useState([]);
    const [mode, setMode] = useState("DRIVING");

    //state variables for configuring distances
    const [directionResponse, setDirectionResponse] = useState(null);
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [error, setError] = useState(null);

    // refs for refferring inputs
    const inputWaypointRef = useRef(null);
    const inputOriginRef = useRef(null);
    const inputDestinationRef = useRef(null);

    //Mode change handler 
    const handleModeChange = (event) => {
        setMode(event.target.value);
        setDirectionResponse(null);
    }

    //Callback to handle routes and errors
    function handleDirections(response, status) {
        if (status === "OK") {
            setDirectionResponse(response);
            setError(null);
            setDistance(response.routes[0].legs[0].distance.text);
            setDuration(response.routes[0].legs[0].duration.text);

        } else {
            setDirectionResponse(null);
            setError("Unable to find a route between the origin and destination.");
            console.error(`error fetching directions ${status}`);
        }
    }

    // Fetching directions handler
    const calculateRoute = () => {
        if (origin === "" || destination === "") {
            alert("Please enter origin and destination to continue");
            inputOriginRef.current.focus();
            return;
        }
        // eslint-disable-next-line no-undef
        const directionService = new google.maps.DirectionsService();
        directionService.route({
            origin: origin,
            destination: destination,
            waypoints: waypoints.map((waypoint) => ({ location: waypoint })),
            travelMode: mode
        },
            handleDirections
        )

    }

    // Add waypoint handler
    const addWaypoint = event => {
        const waypoint = event.target.value;
        if (waypoint !== '' && waypoints[waypoints.length - 1] !== waypoint) {
            setWaypoints(prevWaypoints => [...prevWaypoints, waypoint]);
        }
    };

    // Delete all the waypoints handler
    const deleteWaypoints = () => {
        setWaypoints([]);
        inputWaypointRef.current.value = "";
    }

    // Config of map,JSApiLoader
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries: ['places']
    });
    if (!isLoaded) {
        return <Loader />;
    }

    return (
        <div className={styles.wholeContainer}>
            <p className={styles.header}>Let's calculate <span className={styles.specialColor}>distance</span> from Google maps</p>
            {error !== null && <p className={styles.header}>{error}</p>}

            {/* Main Div */}
            <div className={styles.heroContainer}>
                {/* Whole Data container */}
                <div className={styles.dataContainer}>
                    {/* Form container */}
                    <div className={styles.formContainer}>
                        <div className={styles.formElements}>
                            <div className={styles.checkPoints}>
                                <label htmlFor="origin">Origin</label>
                                <Autocomplete>
                                    <input type="text" id='origin' className={styles.origin} onBlur={(e) => setOrigin(e.target.value)} ref={inputOriginRef} />
                                </Autocomplete>
                            </div>
                            <div className={styles.checkPoints}>
                                <label htmlFor="stop">Stop</label>
                                <Autocomplete>
                                    <input type="text" id='stop' className={styles.stop} onBlur={addWaypoint} ref={inputWaypointRef} />
                                </Autocomplete>
                                {waypoints.length > 0 &&
                                    waypoints.map((waypoint, ind) => (
                                        <input type="text" id='stop' className={styles.stop} value={waypoint} disabled key={ind} />
                                    ))
                                }
                                <div className={styles.showButtons}>
                                    <p onClick={() => {
                                        inputWaypointRef.current.value = "";
                                        inputWaypointRef.current.focus();
                                    }}><img src={plus} alt="Plus" />Add another stop</p>
                                    {waypoints.length > 0 && <p onClick={deleteWaypoints}>➖ Delete stops</p>}
                                </div>

                            </div>
                            <div className={styles.checkPoints}>
                                <label htmlFor="destination">Destination</label>
                                <Autocomplete>
                                    <input type="text" id='destination' className={styles.destination} onBlur={(e) => setDestination(e.target.value)} ref={inputDestinationRef} />
                                </Autocomplete>
                            </div>

                            <label className={styles.modeStyle}>
                                Mode of travel:-
                                <select value={mode} onChange={handleModeChange}>
                                    <option value="DRIVING">Driving</option>
                                    <option value="WALKING">Walking</option>
                                    <option value="TRANSIT">Transit</option>
                                </select>
                            </label>
                        </div>
                        {/* Calculate Button */}
                        <div className={styles.buttons}>
                            <button type='submit' onClick={calculateRoute}>Calculate</button>
                        </div>
                    </div>

                    {/* Result container */}
                    <div className={styles.resultContainer}>
                        {distance === '' ? (
                            <div className={styles.resultHeroSection}>
                                <p className={styles.distance}>Enter origin and destination to calculate value.</p>
                            </div>
                        ) : (
                            <>
                                <div className={styles.resultHeroSection}>
                                    <p className={styles.distance}>Distance</p>
                                    <p className={styles.kms}>{distance}</p>
                                </div>
                                <div className={styles.text}>
                                    <p>The distance between <span className={styles.special}>{origin}</span> and <span className={styles.special}>{destination}</span> via the selected route is <span className={styles.special}>{distance}</span>,time required by <span className={styles.special}>{mode.toLowerCase()}</span> is <span className={styles.special}>{duration}</span></p>
                                </div>
                            </>
                        )}

                    </div>

                </div>
                {/* Map Element */}
                <div className={styles.mapContainer}>
                    {
                        (!isLoaded) ? (<Loader />) : (
                            <GoogleMap
                                center={center}
                                zoom={10}
                                mapContainerStyle={{ width: '100%', height: '100%' }}
                                options={{
                                    zoomControl: false,
                                    streetViewControl: false,
                                    mapTypeControl: false,
                                    fullscreenControl: false
                                }}
                            >

                                {directionResponse && mode === "DRIVING" && (
                                    <DirectionsRenderer
                                        directions={directionResponse}
                                        options={{
                                            polylineOptions:
                                            {
                                                strokeColor: "#0088FF",
                                                strokeWeight: 6,
                                                strokeOpacity: 0.6
                                            },

                                        }}

                                    />
                                )}
                                {directionResponse && mode === "TRANSIT" && (
                                    <DirectionsRenderer
                                        directions={directionResponse}
                                        options={{
                                            polylineOptions: { strokeColor: "red", strokeWeight: 6, strokeOpacity: 0.6 },
                                        }}
                                    />
                                )}
                                {directionResponse && mode === "WALKING" && (
                                    <DirectionsRenderer
                                        directions={directionResponse}
                                        options={{ polylineOptions: { strokeColor: "green", strokeWeight: 6, strokeOpacity: 0.6 } }}
                                    />
                                )}
                            </GoogleMap>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default DataContainer



