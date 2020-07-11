window.parseMact = (mact) => {
    let points = [];
    mact.split(';').forEach(event => {
        if (event) {
            var [eventCount, eventType, timeStamp, x, y] = event.split(',');
            points.push({
                x: parseInt(x),
                y: parseInt(y),
                eventType, 
                timeStamp: parseInt(timeStamp),
                eventCount
            });
        }
    });
    return points;
}