 
const BASE_URL="http://localhost:3002/"
export default async function (endPoint, body, reqType, returnType, token) {
    console.log("req type is ", reqType)
  const response = await fetch(
    `${BASE_URL}${endPoint}`,

    {
      method: reqType, // *GET, POST, PUT, DELETE, etc.
    //   mode: 'cors', // no-cors, *cors, same-origin
    //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `${token}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Type': "multipart/form-data",
      },
    //   redirect: 'follow', // manual, *follow, error
    //   referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: body, // body data type must match "Content-Type" header
    },
  ).catch(error => {
    console.log('ERROR: ' + error);
   

    alert(error);

    return null;
  });

  if (response) {
    return response.json();
  } else return null;
}
