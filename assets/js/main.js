// <!--===== Build A Drawing or Paint App    =====-->

const canvas = document.querySelector("canvas"),
toolBtns = document.querySelectorAll(".tool"),
fillColor = document.querySelector("#fill-color"),
sizeSlider = document.querySelector("#size-slider"),
colorBtns = document.querySelectorAll(".colors .option"),
colorPicker = document.querySelector("#color-picker"),
clearCanvas = document.querySelector(".clear-canvas"),
saveImg = document.querySelector(".save-img"),
ctx = canvas.getContext("2d");

let prevMouseX, prevMouseY, snapshot,
isDrawing = false,
selectedTool = "brush",
selectedColor = "#000",
brushWidth = 5;

const setCanvasBackground = () =>{
   ctx.fillStyle = "#fff";
   ctx.fillRect(0,0, canvas.width, canvas.height);
   ctx.fillStyle = selectedColor;
}

window.addEventListener("load", ()=>{
   canvas.width = canvas.offsetWidth;
   canvas.height = canvas.offsetHeight;
   setCanvasBackground();
})

const drawRect = (e) =>{
   if(!fillColor.checked){
      return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
   }
   ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

const drawCircle = (e) =>{
   ctx.beginPath();
   let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX),2)+ Math.pow((prevMouseY - e.offsetY),2))
   ctx.arc(prevMouseX, prevMouseY, radius, 0, 2*Math.PI);
   fillColor.checked ? ctx.fill() : ctx.stroke();
}

const drawTriangle = (e) =>{
   ctx.beginPath();
   ctx.moveTo(prevMouseX, prevMouseY);
   ctx.lineTo(e.offsetX, e.offsetY);
   ctx.lineTo(prevMouseX*2 - e.offsetX, e.offsetY);
   ctx.closePath();
   fillColor.checked ? ctx.fill() : ctx.stroke();
}

const startDraw = (e) =>{
   prevMouseX = e.offsetX;
   prevMouseY = e.offsetY;
   isDrawing = true;
   ctx.beginPath(); //create new Path
   ctx.lineWidth = brushWidth;
   ctx.strokeStyle = selectedColor; //passing selectedColor as stroke style
   ctx.fillStyle = selectedColor; //passing selectedColor as fill style
   //copying canvas data & passing as snapshot value...this avoids dragging the image
   snapshot = ctx.getImageData(0,0,canvas.width, canvas.height);
}

const drawing = (e) =>{
   if(!isDrawing) return;
   ctx.putImageData(snapshot,0,0); //add copied canvas to the this canvas
   if(selectedTool === "brush" || selectedTool === "eraser" ){
      ctx.strokeStyle = selectedTool ==="eraser" ? "#fff" : selectedColor;
      ctx.lineTo(e.offsetX, e.offsetY); //creating line according to the mouse pointer
      ctx.stroke(); //drawing//filing line with color;
   }else if(selectedTool == "rectangle"){
      drawRect(e);
   }else if(selectedTool == "circle"){
      drawCircle(e);
   }else if(selectedTool == "triangle"){
      drawTriangle(e);
   }
   

   
}

toolBtns.forEach(btn =>{
   btn.addEventListener("click",()=>{
      document.querySelector(".options .active").classList.remove("active");
      btn.classList.add("active");
      selectedTool = btn.id;
   })
})

colorBtns.forEach(btn =>{
   btn.addEventListener("click", ()=>{
     
      document.querySelector(".options .selected").classList.remove("selected");
      btn.classList.add("selected");

      selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
   })
})

colorPicker.addEventListener("change", ()=>{
   colorPicker.parentElement.style.background = colorPicker.value;
   colorPicker.parentElement.click();
})

clearCanvas.addEventListener("click", ()=>{
   ctx.clearRect(0,0,canvas.width, canvas.height);
   setCanvasBackground();
})

saveImg.addEventListener("click", ()=>{
   const link = document.createElement("a");
   link.download = `${Date.now()}.png`; //passing cureent date as link download value
   link.href = canvas.toDataURL();
   link.click();

})
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);
sizeSlider.addEventListener("change", ()=> brushWidth = sizeSlider.value)





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
generateBtn = document.querySelector('.generate__btn'),
options = document.querySelectorAll('.option__item input'),
copyIcon = document.querySelector('.generator__input__box i'),
passIndicator = document.querySelector('.generator__indicator'),
input__box = document.querySelector('.generator__input__box input');

const characters = {
   lowercase: "abcdefghijklmnopqrstuvwxyz",
   uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
   numbers: '0123456789',
   symbols : ":.,;@#$!^[]{}*",
}

const generatePassword = () =>{
   let staticPassword = "",
   randomPassword = "",
   excludeDuplicate = false,
   passLength = lengthSlider.value;
   options.forEach(item =>{
      if(item.checked){
         if(item.id != 'exc-duplicate' && item.id != 'spaces'){
            staticPassword += characters[item.id];
         }else if(item.id === 'spaces'){
            staticPassword += ` ${staticPassword} `;
         } else{
            excludeDuplicate = true;
         }
      }
   });

   for (let i = 0; i < passLength; i++) {

      let randomChar =  staticPassword[Math.floor(Math.random() * staticPassword.length)];
      if(excludeDuplicate){
         !randomPassword.includes(randomChar) || randomChar == " "? randomPassword += randomChar : i--;
      }else{
         randomPassword += randomChar;
      }
   };
   input__box.value = randomPassword;

}
generatePassword();

const updatePassIndicator = () =>{
   passIndicator.id = lengthSlider.value <= 8 ? "weak" :  lengthSlider.value <= 16 ? "medium" : "strong";
}
const updateSlider = () =>{  
   document.querySelector('.generator__pass__length span').innerText = lengthSlider.value;
   generatePassword();
   updatePassIndicator();
}

updateSlider();
const copyPassword = () =>{
   navigator.clipboard.writeText(input__box.value);
   copyIcon
}

lengthSlider.addEventListener("input", updateSlider);
copyIcon.addEventListener("click", copyPassword);
generateBtn.addEventListener("click", generatePassword);


/* <!--===== Word Guessing Game  =====-->*/
const wordList = [
   {
      word: "python",
      hint: "programming language"
   },
   {
      word: "guitar",
      hint: "a musical instrument"
   },
   {
      word: "aim",
      hint: "a purpose or intention"
   },
   {
      word: "venus",
      hint: "planet of our solar system"
   },
   {
      word: "gold",
      hint: "a yellow precious metal"
   },
   {
      word: "idea",
      hint: "a thought or suggestion"
   },
   {
      word: "server",
      hint: "related to computer or system"
   },
   {
      word: "svg",
      hint: "a vector image format"
   },
   {
      word: "jpeg",
      hint: "a small image file format"
   },
   {
      word: "search",
      hint: "act to find something"
   }
]
const inputs = document.querySelector('.guessing__inputs');
const resetBtn = document.querySelector('.guessing__btn-reset');
const hint = document.querySelector('.guessing__hint span');

function randomWord(){
   let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
 
   
   let word = ranObj.word;
   hint.innerText = ranObj.hint;
   
   let html = "";
   for (let index = 0; index < word.length; index++) {
      html += `<input type="text"  disabled>`
   }
   inputs.innerHTML = html;
}
randomWord();

resetBtn.addEventListener('click', randomWord);


// <!--===== Resize and Compress Images   =====-->

const uploadBox = document.querySelector('.resizing__upload-box'),
fileInput = uploadBox.querySelector('input'),
previewImg = uploadBox.querySelector('img'),
widthInput = document.querySelector('.resizing-width input'),
heightInput = document.querySelector('.resizing-height input'),
ratioInput = document.querySelector('.resizing-ratio input'),
qualityInput = document.querySelector('.resizing-quality input'),
downloadBtn = document.querySelector('.download-btn')

let ogImageRatio;
const loadFile = (e) =>{
   const file = e.target.files[0];
   if(!file) return;
   previewImg.src = URL.createObjectURL(file);
   previewImg.addEventListener('load', ()=>{
      widthInput.value = previewImg.naturalWidth;
      heightInput.value = previewImg.naturalHeight;
      document.querySelector('.resizing-wrapper').classList.add('active');
      ogImageRatio = previewImg.naturalWidth/previewImg.naturalHeight;
   })

}

widthInput.addEventListener('keyup', ()=>{
   const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
   heightInput.value = Math.floor(height);
})
heightInput.addEventListener('keyup', ()=>{
   const width = ratioInput.checked ? heightInput.value * ogImageRatio : widthInput.value;
   widthInput.value = Math.floor(width);
})

const resizeAndDownload = () =>{
   const canvas = document.createElement("canvas");
   const a = document.createElement("a");
   const ctx = canvas.getContext("2d");

   const imgQualityInput = qualityInput.checked ? .7 : 1;

   canvas.width = widthInput.value;
   canvas.height = heightInput.value;

   ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
   a.href = canvas.toDataURL('image/jpeg', imgQualityInput);
   a.download  = new Date().getTime();
   a.click();
}

downloadBtn.addEventListener('click', resizeAndDownload)
fileInput.addEventListener('change', loadFile);
uploadBox.addEventListener('click',() => fileInput.click());





