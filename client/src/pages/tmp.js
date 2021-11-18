useEffect(() => {
    if(!allPosts) return
    let postFeatures = []
    allPosts.forEach((post) => {
      let theCenter = [];
      async function makeFeature() {
        axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${post.location}.json?access_token=pk.eyJ1Ijoic3VuZ2NodW4iLCJhIjoiY2t2djFnNjRuMDA0YTJvb2V3NWN3MG8xeCJ9.9wh2aRtP8nPesxW4bwjEIQ`
          )
          .then((response) => {
            const { center } = response.data.features[0];
            theCenter = center;
          })
        .catch((err) => {
          console.log(err);
        })
        const marker = {
          'type': "Feature",
          'geometry': {
            'type': "Point",
            'coordinates': theCenter,
          },
          'properties': {
            'title': post.location,
            'id': post._id
          }
        }
        console.log('marker', marker)
      }
        makeFeature()
      };
    postFeatures.push(marker)
    const {data} = geoJSON
    data.features = postFeatures
    setGeoJSON({...geoJSON, data})
    }, [allPosts]);