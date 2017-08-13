import 'isomorphic-fetch'

const endpointBase = 'http://localhost:8080'

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
  return json.items
}

const getDress = async (id) => {
  const endpoint = `${endpointBase}/dresses/${id}`
  const res = await fetch(endpoint)
  const json = await res.json()
  return json
}

const getHitlist = async () => {
  const endpoint = `${endpointBase}/hitlist`
  const res = await fetch(endpoint)
  const json = await res.json()
  return json.lines
}

const addToHitlist = async (id, rating = 3) => {
  const endpoint = `${endpointBase}/hitlist/lines`
  const body = {dress_id: id, rating}  
  const req = await fetch(endpoint, {
    method: requestMethods.POST,
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(body),
  })
  const res = await req.text()
  return res
}

const removeFromHitlist = async (id) => {
  const endpoint = `${endpointBase}/hitlist/${id}`
  const res = await fetch(endpoint, {
    method: requestMethods.DELETE
  })
  return res
}

export {
  getDresses,
  getDress,
  getHitlist,
  addToHitlist,
  removeFromHitlist
}