'user strict'


var products = [
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
];
var path = [
    "jpg",
    "jpg",
    "jpg",
    "jpg",
    "jpg",
    "jpg",
    "jpg",
    "jpg",
    "jpg",
    "jpg",
    "jpg",
    "jpg",
    "jpg",
    "jpg",
    "png",
    "jpg",
    "jpg",
    "gif",
    "jpg",
    "jpg",
];

var leftImg = document.getElementById('leftImage');
var centerImg = document.getElementById('centerImage');
var rightImg = document.getElementById('rightImage');
var imageSection = document.getElementById('imageSection');

var leftItems, centerProducts, rightProducts;
var random1 = 0, random2 = 0, random3 = 0;
var round = 0;
var sessionLength = 25;
var sessionEnd = false;


//var malls = []; // array for selling items
Mall.all = [];

function Mall(mItems, imagePath) {
    this.mallItem = mItems;
    this.imagePath = imagePath;
    this.views = 0;
    this.clicks = 0;
    Mall.all.push(this);
}

function render(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;

}

function createItem() {
    for (var i = 0; i < products.length; i++) {
        new Mall(products[i], path[i]);
    }
}

function randomRender() {
    
//var randomNew = [random1,random2,random3]

// do{
//     random1 = render(0, products.length - 1);
// }while(randomNew.includes(random1))
// randomNew.push(random1);

// do{
//     random2 = render(0, products.length - 1);
// }while(randomNew.includes(random2))
// randomNew.push(random2);
// do{
//     random3 = render(0, products.length - 1);
// }while(randomNew.includes(random3))
// randomNew.push(random3);
    do {
        random1 = render(0, products.length - 1);
        random2 = render(0, products.length - 1);
        random3 = render(0, products.length - 1);
    } while (random1 == random2 || random1 == random3 || random2 == random3);

    
    leftImg.src = `images/${products[random1]}.${path[random1]}`;
    centerImg.src = `images/${products[random2]}.${path[random2]}`;
    rightImg.src = `images/${products[random3]}.${path[random3]}`;

    leftItems = Mall.all[random1];
    centerProducts = Mall.all[random2];
    rightProducts = Mall.all[random3];
}
function allResults() {
    if (sessionEnd == false) {
        var ul = document.getElementById('finalResults');
        for (let i = 0; i < Mall.all.length; i++) {
            var li = document.createElement('li');
            li.textContent = `${Mall.all[i].mallItem} had ${Mall.all[i].clicks} votes, and was seen ${Mall.all[i].views} times.`
            ul.append(li);
        }
        sessionEnd = true;
    }
}



function fillData() {
    totalClicks = [];
    totalViews = [];
    fillDataSet = [];

    for (var i = 0; i < Mall.all.length; i++) {
        totalClicks.push(Mall.all[i].clicks);
        totalViews.push(Mall.all[i].views);
        fillDataSet.push(Mall.all[i].views * Mall.all[i].clicks);

    }


}
function renderChart() {
    fillData();



    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: products,
            label: '# of Votes',
            datasets: [
                {
                    label: 'clicks',
                    backgroundColor: 'rgb(10,90,80)',
                    borderColor: 'rgb(44,43,66)',
                    data: totalClicks


                },
                {
                    label: 'views',
                    backgroundColor: 'rgb(101,140,220)',
                    borderColor: 'rgb(55,33,22)',
                    data: totalViews


                }
            ],

        }
    }

    );
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
    else { allResults();renderChart(); }
}
imageSection.addEventListener('click', handleClick);
createItem();
randomRender();