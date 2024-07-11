const fetchScienceMuseum = async (urlSearch) => {
    const url = 'https://collection.sciencemuseumgroup.org.uk';
    let fetchedData

    await fetch(`${url}${urlSearch}`, { headers: { Accept: 'application/json' } })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(new Error(res.status + ' Failed to fetch results'));
        }
      })
      .then((json) => {
        fetchedData = json.data
      })
      .catch((err) => {
        console.error(err);
      });

    return fetchedData
}

const fetchVam = async (urlSearch) => {
    const url = 'https://api.vam.ac.uk/v2';
    let fetchedData

    await fetch(`${url}${urlSearch}`, { headers: { Accept: 'application/json' } })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(new Error(res.status + ' Failed to fetch results'));
        }
      })
      .then((json) => {
        fetchedData = json
      })
      .catch((err) => {
        console.error(err);
      });

    return fetchedData
}

module.exports = {fetchScienceMuseum, fetchVam}