const button = document.querySelector('.openbtn')
const modalWindow = document.querySelector('.modal-window')
const con = document.querySelector('.container')
const topBtn = document.querySelector('.totop')
const nav = document.querySelector('nav')
const navHeight = nav.clientHeight
const closeBtn = document.querySelector('.closebtn')
const menuOne = document.querySelector('.menuone')
const dropDown = document.querySelector('.dropdown')

function openModal () {
  if(button.innerText === `'Click!'`){
    modalWindow.classList.remove('close')
    con.classList.remove('close')
    modalWindow.classList.add('show')
    con.classList.add('show')
    document.body.style.overflow = 'hidden'
    button.innerText = '닫기'
    button.classList.add('close')
  }
  else{
    // modalWindow.classList.remove('show')
    // con.classList.remove('show')
    // modalWindow.classList.add('close')
    // con.classList.add('close')
    // document.body.style.overflow = 'auto'
    // button.innerText = `'Click!'`
  }
}
function closeModal() {
  modalWindow.classList.remove('show')
  button.classList.remove('close')
  con.classList.remove('show')
  modalWindow.classList.add('close')
  con.classList.add('close')
  document.body.style.overflow = 'auto'
  button.innerText = `'Click!'`
  button.classList.add('show')
}

// function toTop(){
//   scrollTo(0,0)
// }

function scollP(){
  if(window.pageYOffset < 100){
    topBtn.classList.remove('show')
    topBtn.classList.add('close')
  }else{
    topBtn.classList.remove('close')
    topBtn.classList.add('show')
  }
}
function navp(){
  // console.log(navHeight)
  // console.log(window.pageYOffset)
  if(window.pageYOffset > navHeight){
    nav.classList.remove('close')
    nav.classList.add('show')
  }
  else{
    nav.classList.remove('show')
    nav.classList.add('close')
  }
}

function dropOpen (e) {
  dropDown.classList.add('visi')
  dropDown.classList.remove('novisi')
  e.stopPropagation()
}
  function dropClose(e){
    if(dropDown.classList.contains('visi') && !dropDown.contains(e.target)){
      // console.log(dropDown.contains(e.target))
      dropDown.classList.remove('visi')
      dropDown.classList.add('novisi')
    }
  }
button.addEventListener('click', openModal)
topBtn.addEventListener('click', function(){scrollTo(0,0)})
closeBtn.addEventListener('click', closeModal)
menuOne.addEventListener('click',dropOpen)
document.addEventListener('click',dropClose)

window.addEventListener('scroll',scollP)
window.addEventListener('scroll',navp)

//2일차 - 가운데 api로 가져온 데이터 스크롤추가

const url = 'https://chinese-food-db.p.rapidapi.com/';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8c87c444d5msha70b17f0e3d0ccdp16e6c3jsn805938a8245d',
		'X-RapidAPI-Host': 'chinese-food-db.p.rapidapi.com'
	}
};
const itemCon = document.querySelector('.item-container')
const clientHeight = document.documentElement.clientHeight
const scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);


function scrollX (){
//  console.log(window.pageYOffset / (scrollHeight - clientHeight))
 itemCon.scrollLeft = window.pageYOffset / (scrollHeight - clientHeight) * ( itemCon.scrollWidth - itemCon.clientWidth)
}


window.addEventListener('scroll',scrollX)

function loadApi(url, options){
  return fetch(url, options)
          .then(response => response.json())
}

function showData (foodList){
  return new Promise (function(resolve, reject){
    console.log(foodList)
    
    for(i=0; i<foodList.length; i++){
      let box = document.createElement('div')
      itemCon.append(box)
      box.className = 'box'

      let imgbox = document.createElement('div')
      box.append(imgbox)
      imgbox.className = 'imgbox'
      
      let textbox = document.createElement('div')
      box.append(textbox)
      textbox.className = 'textbox'

      let img = document.createElement('img')
      img.src = foodList[i].image
      imgbox.append(img)
      
      let title = document.createElement('h3')
      title.innerHTML = `${foodList[i].title}`
      textbox.append(title)
    }
    let msgbox = document.createElement('div')
    document.body.append(msgbox)
    msgbox.className = 'msgbox'
    msgbox.innerText = '컨텐츠 로드 완료 !'
    msgbox.classList.add('show')

    const viewCon = document.querySelector('.itemview-container')
    const viewBox = document.querySelector('.viewbox')
    const viewcontent = document.querySelector('.viewcontent')

    function moreImg (e){
      let targetImg = viewBox.append(e.target)

   
    }

    itemCon.addEventListener('click',moreImg)

    let loadingBox = document.querySelector('.loadingbox')

    loading()
    setTimeout(()=>{
      loadingBox.classList.add('close')
      clearInterval(loadevent)
      resolve(foodList)
    },1000)

    setTimeout(()=> {
      msgbox.classList.add('close')
      resolve(foodList)

    }, 3000)
  })
}

loadApi('https://chinese-food-db.p.rapidapi.com/',options)
    .then(foodList =>showData(foodList))


const navbtn = document.querySelector('.navbtn')
const hovertext = document.querySelector('.hovertext')

function hoverEvent(){
  hovertext.classList.add('show')
}
function removeHoverEvnet(){
  hovertext.classList.remove('show')
}

navbtn.addEventListener('mouseover',hoverEvent)
navbtn.addEventListener('mouseout',removeHoverEvnet)

const userinputs = document.querySelectorAll('.user')
const loginbtn = document.querySelector('.loginbtn')

function inputCheck(userinputs){
  if(userinputs.value === '' || userinputs.value === undefined || userinputs.value === null){
    return alert ('빈칸을 입력하세요')
  }
}

loginbtn.addEventListener('click',inputCheck)

function loading(){
  const circles = document.querySelectorAll('.circle')
  let circle = 0

  function circleChange(){
    circles[circle].classList.add('circle-style')
  }
  function circlenoChange(){
    circles[prevCircle].classList.remove('circle-style')
  }

  function loading(){
    prevCircle = circle
    circle ++
    if(circle > circles.length -1){
      circle =0
    }
    circleChange()
    circlenoChange()
    console.log(circle)
  }

loadevent = setInterval(loading, 500)
}

const menubtn = document.querySelector('.menubtn')
const ul = document.querySelector('.ul')

function openMenu(){
  if(menubtn.classList.contains('show')){
    ul.classList.add('visi')
    ul.classList.remove('novisi')
    menubtn.classList.add('close')
    menubtn.classList.remove('show')
    closeBtn.classList.remove('close')
    closeBtn.classList.add('show')
  }
  else{
    ul.classList.remove('visi')
    ul.classList.add('novisi')
    menubtn.classList.add('show')
    menubtn.classList.remove('close')
    closeBtn.classList.remove('show')
    closeBtn.classList.add('close')
  }
}

menubtn.addEventListener('click',openMenu)
closeBtn.addEventListener('click',openMenu)


