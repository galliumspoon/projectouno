
let createStudioNameTextBox = $("#studioRoomNameBox")
let createStudioSizeTextBox = $("#studioSize")
let createStudioCostTextBox = $("#studioCost")
let saveStudioBtn = $("#createStudioBtn")
let listStudiosBtn = $("#listStudiosBtn")
let indivStudioListing = $("#studioRoom")
let hourSlots = ["9to10", "10to11", "11to12", "12to1", "1to2", "2to3", "3to4", "4to5"]

// set reference to root of firebase database
let ref = firebase.database().ref()
let studiosRef = ref.child("studios")

//Create a studio
saveStudioBtn.click(function() {
let studioName = createStudioNameTextBox.val()
let studioCost = createStudioCostTextBox.val()
let studioSize = createStudioSizeTextBox.val()
let studioDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
let studio = new Studio(studioName, studioCost, studioSize)
// try to add in studioDays to above??

  studiosRef.child(studio.title).set({
    title : studio.title,
    size : studio.size,
    cost : studio.cost

    // days : studio.days

  })

})

// listener for listStudiosBtn
listStudiosBtn.click(function() {
  listStudios()

})



// Create a listening function

function setupStudioObserver(){
studiosRef.on('value', function(snapshot) {

  console.log(snapshot.val())

  for(key in snapshot.val()) {
       // Get titles, etc. of each object off of studiosRef branch
    let title = (snapshot.val()[key].title)
    let cost = (snapshot.val()[key].cost)
    let size = (snapshot.val()[key].size)
    // let days = (snapshot.val()[key].days)

    console.log(title)
    console.log(cost)
    console.log(size)
    // console.log(days)

  }
})
}

function listStudios() {
  let openDivContainer = document.getElementById('projDiv');
  studiosRef.once('value', function(snapshot) {

  for(key in snapshot.val()) {
       // Get titles, etc. of each object off of studiosRef branch
    let title = (snapshot.val()[key].title)
    let cost = (snapshot.val()[key].cost)
    let size = (snapshot.val()[key].size)
    // let days = (snapshot.val()[key].days)
    // let days = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"]


    let addItemDiv = document.createElement('div');
    openDivContainer.appendChild(addItemDiv);


    let addStudioName = document.createElement('li');
    addStudioName.innerHTML = "Studio Name: " + title ;
    let addStudioCost = document.createElement('li');
    addStudioCost.innerHTML = "Cost = " + cost ;
    let addStudioSize = document.createElement('li');
    addStudioSize.innerHTML = "Size: " + size ;
    // let addStudioDays = document.createElement('li');
    // addStudioDays.innerHTML = days;


    addItemDiv.appendChild(addStudioName);
    addItemDiv.appendChild(addStudioCost);
    addItemDiv.appendChild(addStudioSize);
    // addItemDiv.appendChild(addStudioDays);
    }
})
}



setupStudioObserver()

let projDiv = $("#projDiv")

//let studio1Ref = studiosRef.child("studio-1")

// studiosRef.child("studio-1").set({
//   title : studioName,
//   size: "200 sq. ft.",
//   cost: "$50/hr."
//   day
//
// })
//
// studiosRef.child("studio-2").set({
//   title : "Studio 2",
//   size: "230 sq. ft.",
//   cost: "$55/hr."
// })
