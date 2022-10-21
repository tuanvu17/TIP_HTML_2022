const search__icon = document.querySelector('.search__icon');
const search__container = document.querySelector('.search-container');
search__icon.addEventListener('click', () => {
   search__container.classList.toggle('active');
})

const input = document.getElementById('mysearch');
const search__clear = document.querySelector('.search__clear');

search__clear.addEventListener('click', () => {
   input.value = '';
})

const findContainer = document.getElementById('find-container');
const findIcon = document.getElementById('find-icon');

findIcon.addEventListener('click', () => {
   findContainer.classList.toggle('active')
});

const findClear = document.getElementById('find-clear');
const inputB = document.getElementById('myfind');

findClear.addEventListener('click', () => {
   inputB.value = ''
})

const circulaMenu = document.getElementById('circula-menu');
const circularToggle = document.getElementById('circular-toggle');

circularToggle.addEventListener('click', () => {
   circulaMenu.classList.toggle('active');
});

const progressBar = document.getElementsByClassName('progress-bar')[0];
const myInterval = setInterval(() => {
   const computerStyle = getComputedStyle(progressBar);
   let width = parseFloat(computerStyle.getPropertyValue('--width'));
   // tang 
   progressBar.style.setProperty('--width', width + .1);
    if (width >= 100) {
      width = 0.0;
      progressBar.style.setProperty('--width', width + .1);
      // clearInterval(myInterval);
   }
}, .1);

/*===== Gradient  =====*/
let btn = document.querySelector('.mouse-cursor-gradient-tracking');
btn.addEventListener('mousemove', e =>{
   let rect = e.target.getBoundingClientRect();
   let x = e.clientX - rect.left;
   let y = e.clientY - rect.top;
   btn.style.setProperty('--x', x + 'px');
   btn.style.setProperty('--y', y + 'px');
})


/*===== Pagination  =====*/
/*
   #1. trường hợp page truyền vào lớn hơn 1 ==>> add thẻ prev vào đầu chuỗi
   #2. như #1 trường hợp page value nhỏ hơn totalpages thì add thẻ next vào cuối chuỗi
   #3. - trường hợp page value lớn hơn 2 thì add item 1 vào tiếp theo
      - trường hợp page value lơn hơn 3 thì add tiếp dots (...)
   #4. như #3 nhỏ hơn 20 thì add 20 vào nhóm cuối và nếu nhỏ hơn 20-2 thì add tiếp dots (...)
   #5 xét trường hợp ở giữa. page value truyền vào lớn hơn 3 nhỏ hơn 18
   #5 
 */
const ulTag = document.querySelector('.pagination-container ul');
let totalPages = 20;

function element(totalPages, page){
   let liTag = '';
   let activeLi;
   let beforePages = page -1;
   let afterPages = page +1;
   //1
   if(page > 1) { //if page value is greater than 1 then add new li which is previous button
      liTag += `<li class="paging__btn prev" onclick="element(totalPages, ${page-1})">
      <i class='bx bx-chevron-left'></i>
      <span>Prev</span>
   </li>`;
   }
   //3
   if(page > 2) { //if page value greater than 2 then add new li tag with 1 value
      liTag += ` <li class="numb"><span>1</span></li>`
      if(page > 3) { // if page value greater than 3 then add new li tag with dots value
      liTag += ` <li class="dots"><span>...</span></li>`
      }
   }
   //how many pages or li show before the current li
   if(page == totalPages){
      beforePages = beforePages -2;
      console.log("page:1 ", beforePages);
   }else if(page == totalPages -1){
      beforePages = beforePages -1;
      console.log("page:2 ", beforePages);
   }

   //how many pages or li show after the current li
   if(page == 1){
      afterPages = afterPages + 2;
      console.log("afterPages:1 ", afterPages);
   }else if(page == 2){
      afterPages = afterPages +1;
      console.log("afterPages:2 ", afterPages);
   }
   //5 =>> cho 3 button ơ giữa
   for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
      if(pageLength > totalPages) {
         continue;
      }else if(pageLength==0) {
         pageLength = pageLength +1;
      }
      if(page == pageLength){
         activeLi = 'active'; //if page value is equal to pageLength then assign the active string to activeLi vaviable
      }else activeLi = ''; //else leave empty to the activeLi variable
      liTag += `<li class="numb ${activeLi}" onclick="element(totalPages, ${pageLength})"><span>${pageLength}</span></li>`
   }
   //4
   if(page < totalPages - 1) { //if page value is less then totalPages -1 value then show the last li or page which is 20
      if(page < totalPages - 2) { // if page value less than totalPages -2 then show the last dots value before last
         liTag += ` <li class="dots"><span>...</span></li>`; 
      }
      liTag += ` <li class="numb"><span>${totalPages}</span></li>`
   }
   //2
   if(page < totalPages) { //if page value is less than totalPages values then add new li which is next button
      liTag += `<li class="paging__btn next" onclick="element(totalPages, ${page+1})">
      <span>Next</span>
      <i class='bx bx-chevron-right'></i>
   </li>`;
   }
   ulTag.innerHTML = liTag;
}

element(totalPages, 5); // calling function above with passsing values


// <!--===== Password Generator  =====-->

const lengthSlider = document.getElementById('generator__pass-length'),
generateBtn = document.querySelector('generate__btn'),
options = document.querySelectorAll('.option__item input')
console.log(options);
const updateSlider = () =>{  
   console.log(lengthSlider.value);
   document.querySelector('.generator__pass__length span').innerText = lengthSlider.value;
}

const generatePassword = () =>{
   let staticPassword = "";
   options.forEach(item =>{
      if(item.checked){
         console.log(item);
      }
   })
}

updateSlider();
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
