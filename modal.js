const button = document.querySelector('.openbtn')
const modalWindow = document.querySelector('.modal-window')
const con = document.querySelector('.container')
const topBtn = document.querySelector('.totop')
const nav = document.querySelector('nav')
const navHeight = nav.clientHeight
const closeBtn = document.querySelector('.closebtn')
const closeModalBtn = document.querySelector('.closemodalbtn')
const menuOne = document.querySelector('.menuone')
const dropDown = document.querySelector('.dropdown')
const viewCon = document.querySelector('.itemview-container')
const itemCardcon = document.querySelector('.item-card-container')
const boxs = document.querySelectorAll('.box')
let cardBoxs = document.querySelectorAll('.card-box')
const alignBtn = document.querySelector('.alignbtn')

class Scroller{
  #isScrolling //스크롤 상태 (스크롤링중인지 아닌지 판단) #을 붙히면 외부에서 사용할수없고 이 클래스안에서만 변경가능
  #scrollEndTimer //스크롤이 끝나면 동작하는 타이머

  constructor(isScrolling){ //멤버변수 초기화
    this.#isScrolling = isScrolling
    this.#scrollEndTimer = null 
  }

  //메서드 정의
  getScrollPos(){ //현재 스크롤 위치 조회
    return window.pageYOffset
  }
  setScrollPos(pos){ //해당 위치로 스크롤링
    window.scrollTo(pos)
    this.#setScrollState(true)
  }
  getScrollState(){ //스크롤 상태 조회
    return this.#isScrolling
  }
  #setScrollState(state){ //스크롤 상태 변경
    this.#isScrolling = state //state는 true or false 값
  }
  isScrollended(){ //스크롤링이 끝났음을 감지
    return new Promise((resolve, reject) => {
      clearTimeout(this.#scrollEndTimer)
      this.#scrollEndTimer = setTimeout(() => {
        //스크롤이 끝난 상태
        this.#setScrollState(false)
        resolve()
      }, 100)
    })
  }
}
const scroller = new Scroller(false)

//모달창 열기
function openModal () {
  if(button.innerText === `'Click!'`){
    modalWindow.classList.add('show')
    con.classList.add('show')
    document.body.style.overflow = 'hidden'
    button.innerText = '닫기'
    button.classList.add('close')
  }
  // else{
    // modalWindow.classList.remove('show')
    // con.classList.remove('show')
    // modalWindow.classList.add('close')
    // con.classList.add('close')
    // document.body.style.overflow = 'auto'
    // button.innerText = `'Click!'`
  // }
}

// 모달창 닫기
function closeModal(){  
  modalWindow.classList.remove('show')
  button.classList.remove('close')
  con.classList.remove('show')
  document.body.style.overflow = 'auto'
  button.innerText = `'Click!'`
}

closeModalBtn.addEventListener('click',closeModal)

//스크롤 조금이라도 아래로가면 to top 버튼 생성
function scollP(){
  if(window.pageYOffset < 100){
    topBtn.classList.add('close')
  }else{
    topBtn.classList.remove('close')
  }
}
window.addEventListener('scroll',scollP)

//to top 버튼 누르면 상단으로
topBtn.addEventListener('click', function(){scrollTo(0,0)})

//nav창 아래로가면 보이고 제일 상단은 숨기기
function navp(){
  // console.log(navHeight)
  // console.log(window.pageYOffset)
  if(window.pageYOffset > navHeight){
    nav.classList.remove('close')
  }
  else{
    nav.classList.add('close')
  }
}
window.addEventListener('scroll',navp)

//메뉴1버튼 드롭다운메뉴
function dropOpen (e) {
  dropDown.classList.remove('novisi')
  e.stopPropagation()
}
  function dropClose(e){
    if(!dropDown.classList.contains('visi') && !dropDown.contains(e.target)){
      console.log(e.target)
      // console.log(dropDown.contains(e.target))
      dropDown.classList.add('novisi')
    }
  }
button.addEventListener('click', openModal)
menuOne.addEventListener('click',dropOpen)
document.addEventListener('click',dropClose)


//가운데 api로 가져온 데이터 스크롤추가
// const url = 'https://the-mexican-food-db.p.rapidapi.com/';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '8c87c444d5msha70b17f0e3d0ccdp16e6c3jsn805938a8245d',
// 		'X-RapidAPI-Host': 'the-mexican-food-db.p.rapidapi.com'
// 	}
// };
const url = 'https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser?nutrition-type=cooking&category%5B0%5D=generic-foods&health%5B0%5D=alcohol-free';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8c87c444d5msha70b17f0e3d0ccdp16e6c3jsn805938a8245d',
		'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
	}
};

const itemCon = document.querySelector('.item-container')
const clientHeight = document.documentElement.clientHeight
const scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

//아래로 스크롤시 container 가로로 같이 스크롤
function scrollX (){
//  console.log(window.pageYOffset / (scrollHeight - clientHeight))
 itemCon.scrollLeft = window.pageYOffset / (scrollHeight - clientHeight) * ( itemCon.scrollWidth - itemCon.clientWidth)
}
window.addEventListener('scroll',scrollX)


let offset = 0
const numOfItems = 6
//api가져와서 화면에 띄우기
function loadApi(url, options){
  return fetch(url, options)
          .then(response => response.json())
}

function showData (foodList){
  // 로딩화면 없애기 
  console.log(foodList.hints)

  return new Promise (function(resolve, reject){

     //api 데이터 화면에 추가
    for(i=0; i<foodList.hints.length; i++){
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
      img.src = foodList.hints[i].food.image
      imgbox.append(img)
      
      let title = document.createElement('h3')
      title.innerHTML = `${foodList.hints[i].food.label}`
      textbox.append(title)
    }
    // 초기 로딩시 6개 보여주기
    loadCardbox(foodList)

    
    window.addEventListener('scroll', (event) => {
      //무한스크롤
      const scrollHeight = Math.max(   // 전체문서 높이 (스크롤이벤트 내부에 있어야 함)
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );
  
      if(Math.abs(window.pageYOffset+ document.documentElement.clientHeight - scrollHeight) == 0){
        console.log('바닥에가까워진스크롤')
        offset = offset + numOfItems 
        loadCardbox(foodList)
      }
    })


    //로드완료시 메세지띄우고 3초뒤에 닫기
    let msgbox = document.createElement('div')
    document.body.append(msgbox)
    msgbox.className = 'msgbox'
    msgbox.innerText = '컨텐츠 로드 완료 !'
    msgbox.classList.add('show')

    
    const viewBox = document.querySelector('.viewbox')
    const viewcontent = document.querySelector('.viewcontent')
    const imgBoxs = document.querySelectorAll('.imgbox')
    
    //클릭한 메뉴 아래 컨테이너에 사진,정보 띄우기
    function moreImg (e){
      if(e.target !== itemCon || e.target !== undefined || e.target !==null ){
        // console.log(e.target)
        console.log(e.target.closest('.box').querySelector('.textbox h3').innerText)
        viewBox.innerHTML = ''
        viewcontent.innerText = ''

        viewBox.append(e.target.cloneNode(true))
        viewcontent.append(e.target.closest('.box').querySelector('.textbox h3').innerText)  
        
        // viewBox.append(e.target.closest('.box').querySelector('.textbox h3').innerText)
        
      }
    }

    for (let imgBox of imgBoxs){
      imgBox.addEventListener('click',moreImg)
    }
    
    //카드컴포넌트 사전순 정렬

const imgboxs = document.querySelectorAll('.card-box .imgbox')
const textboxs = document.querySelectorAll('.card-box .textbox')
const cardTitles = []
console.log(textboxs)
textboxs.forEach(cardtext => {
  cardTitles.push({ title: cardtext.innerText, src: cardtext.previousElementSibling.innerHTML})
  console.log(cardTitles)
})
function alignItem(event){
  reCardTitles = [...cardTitles]
  if(alignBtn.innerText === '사전순'){
    reCardTitles.sort(function(a,b){
      if(a.title > b.title) return 1
      if(a.title < b.title) return -1
      return 0
    }) 
    replace(reCardTitles)
    alignBtn.innerText = '기본순'
  }else{
    
    replace(cardTitles)
    alignBtn.innerText = '사전순'
  }
  console.log(reCardTitles)
  console.log(cardTitles)

  function replace(card){
    cardBoxs = ''
    for(i=0; i<card.length; i++){
      imgboxs[i].innerHTML = `${card[i].src}`
      textboxs[i].innerHTML = `<h3>${card[i].title}</h3>`
    }
  }
}
alignBtn.addEventListener('click',alignItem)

    //api가져오는동안 로딩창띄우기
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

//6개씩 불러오기 함수
function loadCardbox(foodList){
  for(let i=offset; i<offset+numOfItems; i++){
    let cardBox = document.createElement('div')
    itemCardcon.append(cardBox)
    cardBox.className = 'card-box'

    let imgbox = document.createElement('div')
    cardBox.append(imgbox)
    imgbox.className = 'imgbox'
    
    let textbox = document.createElement('div')
    cardBox.append(textbox)
    textbox.className = 'textbox'

    let img = document.createElement('img')
    img.src = foodList.hints[i].food.image
    imgbox.append(img)
    
    let title = document.createElement('h3')
    title.innerHTML = `${foodList.hints[i].food.label}`
    textbox.append(title)
  }
}


loadApi('https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser?nutrition-type=cooking&category%5B0%5D=generic-foods&health%5B0%5D=alcohol-free',options)
    .then(foodList =>showData(foodList))

//더미 컨테이너 생성
function getCardBox(num){
  let CardBox = ''
  CardBox.innerHTML = `<div class="card-box"></div>`
  return CardBox
}

//로딩화면
function loading(){
  const circles = document.querySelectorAll('.circle')
  let circle = 0
  
  function circleChange(){
    circles[circle].classList.add('circle-style')
  }
  function circlenoChange(){
    circles[prevCircle].classList.remove('circle-style')
  }
  
  function loadinging(){
    prevCircle = circle
    circle ++
    if(circle > circles.length -1){
      circle =0
    }
    circleChange()
    circlenoChange()
    // console.log(circle)
  }
  
  loadevent = setInterval(loadinging, 300)

}



const navbtn = document.querySelector('.navbtn')
const hovertext = document.querySelector('.hovertext')

//more버튼 호버
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

//인풋 빈칸금지
function inputCheck(userinputs){
  if(userinputs.value === '' || userinputs.value === undefined || userinputs.value === null){
    alert ('빈칸을 입력하세요')
    userinputs.preventDefault(); //새로고침 방지
    return false
  }else{
    return true
  }
}

loginbtn.addEventListener('click',inputCheck)


const menubtn = document.querySelector('.menubtn')
const ul = document.querySelector('.ul')

//반응형시 메뉴 여는버튼
function openMenu(){
  if(menubtn.classList.contains('show')){
    ul.classList.add('visi')
    menubtn.classList.add('close')
    menubtn.classList.remove('show')
    closeBtn.classList.remove('close')
  }
  else{
    ul.classList.remove('visi')
    menubtn.classList.add('show')
    menubtn.classList.remove('close')
    closeBtn.classList.add('close')
  }
}

menubtn.addEventListener('click',openMenu)
closeBtn.addEventListener('click',openMenu)

//반응형때 닫은 ul 사이즈 늘어나면 다시 나타나기
function resizeUl(){
  const ul = document.querySelector('ul')
  
  if (window.innerWidth > 480){
    ul.classList.remove('novisi')
  }
}

window.addEventListener('resize',resizeUl)


// 테마변경 -다크모드 /일반모드
const mode = document.querySelector('.mode')
const icons = mode.querySelectorAll('.icon')
mode.addEventListener('click',(event) => {
  
  document.body.classList.toggle('bright')
  nav.classList.toggle('bright')
  itemCon.classList.toggle('bright')
  viewCon.classList.toggle('bright')
  ul.classList.toggle('bright')
  
  for(cardBox of cardBoxs){
  cardBox.classList.toggle('bright')}

  for(let icon of icons){
    icon.classList.contains('close') ? icon.classList.remove('close') : icon.classList.add('close')
    }
})

//클릭한 아이템의 이름 왼쪽아래에 창 띄우기
window.addEventListener('scroll',(event)=>{
  const viewcontent = document.querySelector('.viewcontent')
  let clickItem = document.querySelector('.clickitembox')
  if(viewCon.getBoundingClientRect().top > nav.offsetHeight+50 && viewcontent.innerText !==''){
    clickItem.innerText = `${viewcontent.innerText}`
    clickItem.classList.add('visi')
  }else{
    clickItem.classList.remove('visi')
  }
})




//검색창에 검색한 결과만 나오게하기
const search = document.querySelector('.search')
function searching(e){
  console.log(e.target.value)
  // if(textboxs.innerHTML)
}

search.addEventListener('keyup',searching)