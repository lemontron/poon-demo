import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { loadCss, loadScript } from 'poon-ui';
import { DEFAULT_ZOOM_LEVEL, defaultLocation, mapBoxStyle } from '../constants.js';
import { boundsToPolygon, createPlaceMarker, createUserLocationMarker, initPlacesSource } from './map-util';

const MapBox = forwardRef(({
	features = [],
	zoom = DEFAULT_ZOOM_LEVEL,
	center = defaultLocation,
	onPressPlace,
	onChangeBounds,
	onMoveStart,
	location,
	followUser,
	placeId,
	accessToken,
}, ref) => {
	const [mb, setMb] = useState(null);
	const [map, setMap] = useState(null);
	const el = useRef(null);
	const userMarker = useRef(null);
	const placeMarker = useRef(null);

	const getViewport = (e) => {
		const bounds = map.getBounds();
		return {
			'bounds': boundsToPolygon(bounds),
			'bbox': [
				bounds.getWest(), // wLng
				bounds.getSouth(), // sLat
				bounds.getEast(), // eLng
				bounds.getNorth(), // nLat
			],
			'isInteraction': Boolean(e && e.originalEvent),
			'zoom': map.getZoom(),
			'screen': {
				'width': el.current?.clientWidth,
				'height': el.current?.clientHeight,
			},
		};
	};

	useImperativeHandle(ref, () => ({
		resize: () => map.resize(),
		setCenter: (point) => {
			map.flyTo({'center': point.coordinates, 'zoom': DEFAULT_ZOOM_LEVEL});
		},
		setBounds: (bbox) => {
			map.fitBounds(bbox, {'duration': 250, 'padding': 30});
		},
		getViewport: () => getViewport(),
	}));

	useEffect(() => {
		if (!location || !map) return;
		if (!userMarker.current) userMarker.current = createUserLocationMarker(location, map); // first location

		userMarker.current.setLngLat(location.coordinates);

		if (followUser) {
			map.setCenter(location.coordinates);
			syncBounds();
		}
	}, [map, location, followUser]);

	useEffect(() => {
		if (map) syncFeatures(features);
	}, [map, features]);

	const syncFeatures = async (features) => {
		// // Load avatar images
		// const avatars = features.reduce((acc, feature) => {
		// 	feature.properties.avatars.forEach(imageId => {
		// 		if (!acc.includes(imageId)) acc.push(imageId);
		// 	});
		// 	return acc;
		// }, []);
		// await Promise.all(avatars.map(imageId => loadAvatarAsync(map, imageId)));

		// await loadIconsAsync(map);

		// Draw features
		map.getSource('features').setData({
			'type': 'FeatureCollection',
			'features': features,
		});
		map.getSource('dots').setData({
			'type': 'FeatureCollection',
			'features': features,
		});
	};

	const syncBounds = (e) => {
		onChangeBounds(getViewport());
	};

	useEffect(() => { // call onChangeBounds events
		if (!map) return;
		map.on('moveend', syncBounds);
		return () => map.off('moveend', syncBounds);
	}, [map, onChangeBounds]);

	useEffect(() => { // Call onMoveStart events
		if (!map || !onMoveStart) return;
		const moveStart = (e) => onMoveStart(e && !!e.originalEvent);
		map.on('movestart', moveStart);
		return () => map.off('movestart', moveStart);
	}, [map, onMoveStart]);

	useEffect(() => { // Handle creation of place marker
		if (!map) return;
		if (placeMarker.current) placeMarker.current.remove(); // remove marker

		const place = features.find(r => r.properties.id === placeId);
		if (place) placeMarker.current = createPlaceMarker(place, map); // show new marker
	}, [map, placeId]);

	useEffect(() => { // Handle clicking on places
		if (!map) return;
		map.on('click', 'places', (e) => {
			console.log(e.features);
			onPressPlace(e.features[0].properties.id);
		});
	}, [map, onPressPlace]);

	// Instantiate map
	useEffect(() => {
		if (!mb) return;

		const instance = new mb.Map({
			'container': el.current,
			'style': `mapbox://styles/hotspotnyc/${mapBoxStyle}`,
			'center': center.coordinates,
			'zoom': zoom,
			'minZoom': 1,
		});

		instance.on('load', async () => {
			setMap(instance);
			await initPlacesSource(instance, features); // draws initial places
		});

		return () => instance.remove();
	}, [mb]);

	// Load scripts
	useEffect(() => {
		Promise.all([
			loadScript('https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js', 'mapboxgl'),
			loadCss('https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css'),
		]).then(res => {
			console.log('Loaded!', res);
			const [mapbox] = res;
			mapbox.accessToken = accessToken;
			setMb(mapbox);
		});
	}, []);

	useEffect(() => { // fix drag
		const cancel = e => {
			e.stopPropagation();
			e.preventDefault();
		};
		el.current.addEventListener('touchstart', cancel);
		el.current.addEventListener('touchmove', cancel);
		el.current.addEventListener('touchend', cancel);
	}, []);

	return <div className="mapbox" ref={el}/>;
});

export default MapBox;