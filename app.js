'use strict'
console.log(`Oh I work`)

function generate(){
    let randomnum = Math.floor(Math.random()*allImages.length)
    return randomnum;
}


const mainSection = document.querySelector("section")
const img1 = document.querySelector(`section img:first-child`)
const img2 = document.querySelector('section img:nth-child(2)')
const img3 = document.querySelector('section img:nth-Child(3)')
const results = document.querySelector(`section+div`)

const maxClicks = 25
let clicks= 0

let allImages = [];




function renderImages() {
    // we need to generate a number to reference the goat we want to render onto the page
    let image1 = generate();
    let image2 = generate();
    let image3 = generate();
  
    while (image1 === image2 || image1 === image3 || image2 === image3) {
      image2 = generate();
      image3 = generate();
    }
//    renderImages();

   
    // now we have two random numbers lets set the attributes of our images in the document.
    img1.src = allImages[image1].imagePath;
    img2.src = allImages[image2].imagePath;
    img3.src = allImages[image3].imagePath;
    img1.alt = allImages[image1].name;
    img2.alt = allImages[image2].name;
    img3.alt = allImages[image3].name;
    allImages[image1].views++;
    allImages[image2].views++;
    allImages[image3].views++;
  };


  
function imagesClickedOn(event){
    if (event.target === mainSection){
        alert("Click on an image")
    } else {
        clicks++;
        console.log(clicks)
        let clickedImage = event.target.alt;
        for (let i =0; i < allImages.length; i++){
            if (clickedImage === allImages[i].name){
                allImages[i].clicks++;
                break
            }
        }
    }
    if (clicks === maxClicks){
        mainSection.removeEventListener("click", imagesClickedOn);
        mainSection.className = "no-voting";
        results.addEventListener("click", chartDetails);
        results.className = "clicks-allowed"
    } else {
    renderImages();
    }
};

function renderResults(){
    console.log("Here are the results")
    let ul = document.querySelector("ul")
    for(let i = 0; i < allImages.length; i++){
        let li = document.createElement("li")
        li.textContent = `${allImages[i].name} had ${allImages[i].clicks} votes, and had ${allImages[i].views} views.`
        ul.appendChild(li);
    }
};

// renderResults();






function Products(name,imagePath){
    this.name = name;
    this.imagePath = imagePath;
    this.clicks = 0;
    this.views = 0;
    allImages.push(this);
};



let productName = [`bag`,`banana`,`bathroom`,`boots`,`breakfast`,`bubblegum`,`chair`,`cthulhu`,`dog-duck`,`dragon`,`pen`,`pet-sweep`, `scissors`,`shark`,`sweep`,`tauntaun`,`unicorn`,`water-can`,`wine-glass`]

for(let i = 0; i< productName.length; i++){
    new Products(productName[i], `images/${productName[i]}.jpg`);
}





// const bag = new Products("bag", "images/bag.jpg")
// const banana = new Products("banana","images/banana.jpg")
// const bathroom = new Products("bathroom", "images/bathroom.jpg")
// const boots = new Products("boots","images/boots.jpg")
// const breakfast = new Products("breakfast", "images/breakfast.jpg")
// const bubblegum = new Products("bubblegum","images/bubblegum.jpg")
// const chair = new Products("chair","images/chair.jpg")
// const cthulhu = new Products("cthulhu", "images/cthulhu.jpg")
// const dogduck = new Products ("dog-duck","images/dog-duck.jpg")
// const dragon = new Products("dragon","images/dragon.jpg")
// const pen = new Products("pen","images/pen.jpg")
// const petsweep = new Products("pet-sweep","images/pet-sweep.jpg")
// const scissors = new Products("scissors","images/scissors.jpg")
// const shark = new Products("shark","images/shark.jpg")
// const sweep = new Products("sweep","images/sweep.png")
// const tauntaun = new Products("tauntaun","images/tauntaun.jpg")
// const unicorn = new Products("unicorn", "images/unicorn.jpg")
// const watercan = new Products("water-can","images/water-can.jpg")
// const wineglass = new Products("wine-glass","images/wine-glass.jpg")

renderImages()

mainSection.addEventListener("click", imagesClickedOn);

let chartName = []
let chartView = []
let chartClick = []

function chartDetails(){
    


    for(let i = 0; i< allImages.length;i++){
        chartName.push(allImages[i].name)
        chartView.push(allImages[i].views)
        chartClick.push(allImages[i].clicks)
    
} 
console.log(chartName)
console.log(chartClick)
console.log(chartView)



const data = {
    labels: chartName,

    datasets: [{
        label: "Clicks",
        data: chartClick,
        backgroundColor: `tomato`,
        borderWidth: 1,
        borderColor: `blue`
        },
        {
            label: "Views",
            data: chartView,
            backgroundColor: `black`,
            borderWidth: 1,
            borderColor: `red`
        }

]
}

const config = {
    type: "bar",
    data: data
}


const duckChart = document.getElementById("myChart")
const newChart = new Chart(duckChart,config)
}

