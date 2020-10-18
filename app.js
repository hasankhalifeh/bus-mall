'user strict'

var items = [
    "bag",
    "banana",
    "bathroom",
    "boots",
    "breakfast",
    "bubblegum",
    "chair",
    "cthulhu",
    "dog-duck",
    "dragon",
    "pen",
    "pet-sweep",
    "scissors",
    "shark",
    "sweep",
    "tauntaun",
    "unicorn",
    "usb",
    "water-can",
    "wine-glass",
]


//var mall = [];
var leftImage = document.getElementById("leftImage");
var centerImage = document.querySelector("#centerImage");
var rightImage = document.querySelector("#rightImage");

var leftItems, centerProducts, rightProducts;
var random1 = 0, random2 = 0, random3 = 0;
var round = 0;
var sessionLength = 25;
var sessionEnd = false;

Mall.all = [];

function Mall(mItems) {
    this.mallItem = mItems;
    this.mItems = `images/${mItems}.jpg || images/${mItems}.png || images/${mItems}.gif`;
    this.views = 0;
    this.clicks = 0;

    Mall.all.push(this);
}
function render(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;

}
function createItem() {
    for (var i = 0; i < items.length; i++) {
        new Mall(items[i], this.mItems);
    }
}
function randomRender() {
    random1 = 0
    random2 = 0
    random3 = 0
    
    while(random1 == random2 || random1==random3 || random2==random3){
        random1=render(0,items.length -1);
        random2=render(0,items.length -1);
        random3=render(0,items.length -1);
    }

leftItems=Mall.all[random1];
centerProducts=Mall.all[random2];
rightProducts=Mall.all[random3];
}

function allResults(){
    if(sessionEnd == false){
        var ul=document.getElementById('Results');
        for (let i=0;i < Mall.all.length;i++){
            var li=document.createElement('li');
            li.textContent=`${Mall.all[i].mallItem} had ${Mall.all[i].clicks} votes, and was seen ${Mall.all[i].views} times.`
            ul.append(li);
        }
        sessionEnd = true;
    }
}
function handleClick(event) {
    if (round < sessionLength) {
        leftItems.views += 1;
        centerProducts.views += 1;
        rightProducts.views += 1;
        if (event.target.id == 'leftImage') {
            leftItems.clicks += 1;
            round += 1;
            randomRender();
        }
        else if (event.target.id == 'centerImage') {
            centerProducts.clicks += 1;
            round += 1;
            randomRender();
        }
        else if (event.target.id == 'rightImage') {
            rightProducts.clicks += 1;
            round += 1;
            randomRender();
        } else { }
    }
    else {allResults();} 
}
image1.addEventListener('click', handleClick);
createItem();
randomRender();
//for (var i = 0; i < items.length; i++); {
    //Mall.all.push(items[i]);

//}

leftImage.setAttribute('src', `images/${items[0]}.jpg`);
leftImage.setAttribute('alt', items[0]);
leftImage.setAttribute('title', items[0]);

centerImage.setAttribute('src', `images/${items[1]}.jpg`);
centerImage.setAttribute('alt', items[1]);
centerImage.setAttribute('title', items[1]);

rightImage.setAttribute('src', `images/${items[2]}.jpg`);
rightImage.setAttribute('alt', items[2]);
rightImage.setAttribute('title', items[2]);




