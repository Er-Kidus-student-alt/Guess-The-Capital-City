fetch("https://countriesnow.space/api/v0.1/countries/capital")
  .then(function (response) {
    const data = response.json();
    return data;
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.log(err);
  });
