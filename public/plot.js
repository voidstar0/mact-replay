window.startTime = Date.now();
var layout = {
    xaxis: {
        range: [0, 2000]
    },
    yaxis: {
        autorange: 'reversed',
        range: [0, 2000]
    }
};

window.updatePlot = (parsedMacts) => {
    const elapsedTime = Date.now() - window.startTime;
    const traces = parsedMacts.map(m => {
        const firstTimestamp = m[0].timeStamp;
        const currentPoints = m.filter(p => p.timeStamp - firstTimestamp <= elapsedTime);
        const text = currentPoints.map(p => {
            return `Timestamp: ${p.timeStamp}\nCount: ${p.eventCount}`
        })
        return {
            x: currentPoints.map(p => p.x),
            y: currentPoints.map(p => p.y),
            text,
            finalTime:  m[m.length - 1].timeStamp - firstTimestamp,
            mode: 'markers',
            type: 'scatter'
        };
    });

    const lastTime = Math.max(...traces.map(t => t.finalTime));
    Plotly.newPlot('myDiv', traces, layout); // Should use an update function instead of creating a new plot everytime.

    if(elapsedTime <= lastTime){
        requestAnimationFrame(() => window.updatePlot(parsedMacts))
    }
}

window.updatePlot(window.mactData.map(window.parseMact))