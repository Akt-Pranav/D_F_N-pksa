const API=window.location.hostname==='deep-nude.co'?'https://api.deep-nude.co':'http://localhost:8888';const uploadEl=document.getElementById('upload');function isProcessing(){return uploadEl.classList.contains('show-overlay');}
uploadEl.ondrop=uploadEl.ondragenter=uploadEl.ondragover=uploadEl.ondragleave=function(event){if(isProcessing()){return;}
event.preventDefault();event.stopPropagation();if(event.type==='drop'){uploadEl.classList.remove('active');processFile(event.dataTransfer.files[0]);}else{uploadEl.classList[event.type==='dragleave'?'remove':'add']('active');}}
window.addEventListener('paste',function(event){if(!isProcessing()){processFile(event.clipboardData.files[0]);}});const inputEl=document.createElement('input');inputEl.type='file';inputEl.accept='image/*';inputEl.onchange=function(){processFile(this.files[0]);this.value='';}
const a=document.createElement('a');document.getElementById('download').onclick=function(){a.click();}
document.getElementById('browse').onclick=function(){if(!isProcessing()){inputEl.click();}}
const removeBlurEl=document.getElementById('removeBlur');const shopEl=document.getElementById('shop');removeBlurEl.onclick=function(){if(serialKey){alert('Please re-upload your image to generate a image without blur/watermark.');}else{shopEl.click();}}
const loaderEl=document.getElementById('loader');const readyEl=document.getElementById('ready');const resultEl=document.getElementById('result');const img=document.createElement('img');resultEl.appendChild(img);img.onload=function(){const canvas=document.createElement('canvas');canvas.width=this.width;canvas.height=this.height;const ctx=canvas.getContext('2d');ctx.filter='';ctx.drawImage(this,0,0,canvas.width,canvas.height);readyEl.style.backgroundImage='url('+canvas.toDataURL()+')';}
const readyTextEl=document.getElementById('readyText');const oldReadyText=readyTextEl.textContent;const showEl=document.getElementById('show');const oldShowText=showEl.textContent;let verifyKey,verifyUrl;showEl.onclick=function(){if(verifyUrl){const redirectTo=window.location.origin+'/verify.html?key='+verifyKey;window.open(verifyUrl+encodeURIComponent(btoa(redirectTo)));}else{uploadEl.classList.add('hidden');resultEl.classList.remove('hidden');}}
setInterval(function(){if(verifyKey&&localStorage[verifyKey]){verifyUrl=verifyKey=null;setOldText();delete localStorage[verifyKey];}},500);function setOldText(){readyTextEl.innerText=oldReadyText;showEl.innerText=oldShowText;}
document.getElementById('reset').onclick=function(){window.location.reload();}
function processFile(file){if(!file.type||!file.type.startsWith('image')){return;}
uploadEl.classList.add('show-overlay');loaderEl.classList.remove('hidden');readyEl.classList.add('hidden');const reader=new FileReader();reader.onload=async function(){try{const data=await convert(reader.result);const url=API+'/?'+serialKey;if(serialKey){n--;localStorage.serial_key_usability=n;if(n===0){removeKey();}else{usabilityEl.innerText=getUsabilityText();}
removeBlurEl.classList.add('hidden');}else{removeBlurEl.classList.remove('hidden');}
if(res.status!==200){throw new Error('Received unexpected status code: '+res.status);}
const json=await res.json();a.href=img.src=json.imgData;a.download='deep-nude.co - '+Math.random().toString(32).slice(2)+'.jpg';verifyUrl=json.verifyUrl;if(verifyUrl){verifyKey='v_'+Math.random();readyTextEl.innerText='Your nude is ready! Please verify that you are a human to view the full high quality image.';showEl.innerText='Start verification';}else{setOldText();}
readyEl.classList.remove('hidden');}catch(error){logError(error);uploadEl.classList.remove('show-overlay');}}
reader.readAsDataURL(file);}
function logError(error){alert('An error occured! Please try again.\nSee the console for more info.');console.error(error);}
function convert(dataUrl){return new Promise(function(resolve,reject){const image=new Image();image.onload=function(){const canvas=document.createElement('canvas');const ctx=canvas.getContext('2d');if(serialKey){canvas.width=canvas.height=512;const s=Math.min(512/this.width,512/this.height);const w=this.width*s;const h=this.height*s;ctx.fillStyle='#fff';ctx.fillRect(0,0,512,512);ctx.drawImage(this,256-w/2,256-h/2,w,h);}else{canvas.width=this.width;canvas.height=this.height;ctx.drawImage(this,0,0);}
resolve(canvas.toDataURL('image/jpeg'));}
image.onerror=function(){reject('Failed to load image while converting.');}
image.src=dataUrl;});}
const freeEl=document.getElementById('free');const premiumEl=document.getElementById('premium');const usabilityEl=document.getElementById('usability');let n=0;let serialKey='';if(localStorage.serial_key&&localStorage.serial_key_usability){n=parseInt(localStorage.serial_key_usability);if(!isNaN(n)&&n>0){serialKey=localStorage.serial_key;usabilityEl.innerText=getUsabilityText(n);premiumEl.classList.remove('hidden');freeEl.classList.add('hidden');}else{n=0;clearLocalStorage();}}
document.getElementById('removeKey').onclick=function(){if(confirm('Are you sure you want to remove your current premium key?')){removeKey();}}
function clearLocalStorage(){delete localStorage['serial_key'];delete localStorage['serial_key_usability'];}
function removeKey(){clearLocalStorage();premiumEl.classList.add('hidden');freeEl.classList.remove('hidden');serialKey='';n=0;}
document.getElementById('copyKey').onclick=function(){navigator.clipboard.writeText(localStorage.serial_key);alert('Copied!');}
function getUsabilityText(){return `${n} more image${n>1?'s':''}`;}
document.getElementById('enterKey').onclick=async function(){const key=prompt('Enter your premium key:');if(!key){return;}
document.body.classList.add('show-checker');try{const res=await fetch(API+'/check?'+key,{method:'POST'});if(res.status===500){throw new Error('Server encountered an error.');}else if(res.status===200){const text=await res.text();if(text==='0'){alert('Key usability already exhausted.\nYou can\'t generate any more images with this key.');}else{n=parseInt(text);serialKey=key;const t=getUsabilityText();alert(`Key installed!\nYou can use it to generate ${t}.`);localStorage.serial_key=key;localStorage.serial_key_usability=n;usabilityEl.innerText=t;showPremiumBox();}}else{alert('Invalid key.');}}catch(error){logError(error);}
document.body.classList.remove('show-checker');}
function showPremiumBox(){freeEl.classList.add('hidden');premiumEl.classList.remove('hidden');}
