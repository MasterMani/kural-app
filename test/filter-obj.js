const filterObj = (arrOfObj, key) => {
  let results = [],
    values = [];
  arrOfObj.forEach(obj => {
    obj = JSON.parse(obj)
    let val = obj[key]
    if(!values.includes(val)) {
      values.push(val)
      results.push(obj)
    }
  })  
  return results
}

module.exports = filterObj