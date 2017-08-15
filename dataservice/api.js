import 'isomorphic-fetch'

const endpointBase = 'http://localhost:8080'

const requestHeaders = new Headers({'Content-Type': 'application/json'})

const requestMethods = {
  POST: "POST",
  GET: "GET",
  DELETE: "DELETE",
  PUT: "PUT"
}

// TODO - error handling

const getDresses = async (pageSize = 50, pageNum = 0) => {
  const endpoint = `${endpointBase}/dresses?pageSize=${pageSize}&pageNum=${pageNum}`
  const res = await fetch(endpoint)
  const json = await res.json()
  return {items: json.items, totalPages: json.total_pages}
}

const getDress = async (id) => {
  const endpoint = `${endpointBase}/dresses/${id}`
  const res = await fetch(endpoint)
  const json = await res.json()
  return json
}

const getSimilarDresses = async (id, type = 'appearance') => {
  const endpoint = `${endpointBase}/similar/${type}/${id}`
  const res = await fetch(endpoint)
  const json = await res.json()
  return  {items: json.items}
}

const getHitlist = async () => {
  const endpoint = `${endpointBase}/hitlist`
  const res = await fetch(endpoint)
  const json = await res.json()
  return json.lines
}

const addToHitlist = async (id, rating = 3) => {
  const endpoint = `${endpointBase}/hitlist/lines`
  const body = {dress_id: id, rating: rating}
  console.log(body)
  const req = await fetch(endpoint, {
    method: requestMethods.POST,
    headers: requestHeaders,
    body: JSON.stringify(body),
  })
  const res = await req.text()
  return res
}

const removeFromHitlist = async (lineID) => {
  const endpoint = `${endpointBase}/hitlist/lines/${lineID}`
  const req = await fetch(endpoint, {
    method: requestMethods.DELETE,
    headers: requestHeaders
  })
  const res = await req.text()
  return res
}

export {
  getDresses,
  getDress,
  getHitlist,
  addToHitlist,
  removeFromHitlist,
  getSimilarDresses 
}