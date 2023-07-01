import React, { forwardRef, useImperativeHandle, useRef } from 'react';

const RainbowShade = forwardRef((props, ref) => {
	const el = useRef();

	useImperativeHandle(ref, () => ({
		progress: (x, width) => {
			const percent = 1 - (x / width);
			el.current.style.backgroundColor = `hsl(${percent * 360},100%,50%)`;
			el.current.style.opacity = percent;
		},
	}));

	return <div className="shade" ref={el}/>;
});

export default RainbowShade;
