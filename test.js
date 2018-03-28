var object = {


  good : ["great,fine"]

}

let map = new Map()

map.set("great", new Set(["good", "fine"]))

console.log(map.has("great"));

console.log(map.get("great").has("good"));

console.log("good" in object);
