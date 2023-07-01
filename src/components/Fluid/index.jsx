import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { createFluid } from './fluid';

const config = {
	SIM_RESOLUTION: 512,
	DYE_RESOLUTION: 512,
	DENSITY_DISSIPATION: 3,
	VELOCITY_DISSIPATION: 0,
	PRESSURE: 0.5,
	PRESSURE_ITERATIONS: 2,
	CURL: 50,
	SPLAT_RADIUS: 0.03,
	SPLAT_FORCE: 0,
	COLOR: {r: .05, g: .05, b: .05},
};

const Fluid = forwardRef((props, ref) => {
	const fluidRef = useRef();
	const canvasRef = useRef();

	useImperativeHandle(ref, () => ({
		progress: (x) => {
			fluidRef.current.move(x);
			canvasRef.width = x;
		},
	}));

	useEffect(() => {
		fluidRef.current = createFluid(canvasRef.current, config);
		return () => fluidRef.current.stop();
	}, []);

	return (
		<div className="dust">
			<canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}/>
		</div>
	);
});

export default Fluid;
