export const setupLocation = async () => {
    let res;
    try {
        res = await getLocation();
        let [lon, lat] = [res.coords.longitude, res.coords.latitude]
        console.styledLog('success', 'got location successfully');
        console.table({ lon, lat })
        return { lat, lon };
    } catch (e) {
        console.warn(e)
    }
}

const getLocation = async function () {
    return await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((result) => {
            resolve(result)
        }, (error) => {
            console.styledLog('error', 'unable to get location');

            alert("error getting location\n make sure you allow Alfonso to see your location")
            reject(error);
        });
    })
    // return await locPromise;
}

