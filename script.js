// 🔥 COMMON HELPER FUNCTION
function show(id, text){
document.getElementById(id).innerText = text;
}


// =========================
// 🔥 1. WORD COUNTER
// =========================
function wordCount(){
let text = document.getElementById("text").value.trim();

if(!text){
alert("Enter text");
return;
}

let words = text.split(/\s+/).length;
let chars = text.length;

show("result", "Words: " + words + " | Characters: " + chars);
}


// =========================
// 🔥 2. PASSWORD GENERATOR
// =========================
function generatePassword(){
let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";
let password = "";

for(let i=0;i<12;i++){
password += chars[Math.floor(Math.random()*chars.length)];
}

show("result", password);
}


// =========================
// 🔥 3. JSON FORMATTER
// =========================
function formatJSON(){
let input = document.getElementById("text").value;

try{
let obj = JSON.parse(input);
show("result", JSON.stringify(obj, null, 4));
}catch(e){
alert("Invalid JSON");
}
}


// =========================
// 🔥 4. EMI CALCULATOR
// =========================
function calculateEMI(){
let p = parseFloat(document.getElementById("amount").value);
let r = parseFloat(document.getElementById("rate").value)/12/100;
let n = parseFloat(document.getElementById("months").value);

if(!p || !r || !n){
alert("Fill all fields");
return;
}

let emi = (p*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
show("result","Monthly EMI: ₹" + emi.toFixed(2));
}


// =========================
// 🔥 5. BASE64 ENCODER
// =========================
function encodeBase64(){
let text = document.getElementById("text").value;
show("result", btoa(text));
}


// =========================
// 🔥 6. BASE64 DECODER
// =========================
function decodeBase64(){
let text = document.getElementById("text").value;

try{
show("result", atob(text));
}catch{
alert("Invalid Base64");
}
}


// =========================
// 🔥 7. YOUTUBE THUMBNAIL
// =========================
function getThumbnail(){
let url = document.getElementById("input").value;

let id = "";

if(url.includes("v=")){
id = url.split("v=")[1].split("&")[0];
}else if(url.includes("youtu.be/")){
id = url.split("youtu.be/")[1];
}else{
alert("Invalid URL");
return;
}

let img = "https://img.youtube.com/vi/" + id + "/maxresdefault.jpg";

document.getElementById("thumb").src = img;
document.getElementById("thumb").style.display = "block";

document.getElementById("download").href = img;
document.getElementById("download").style.display = "inline-block";
}


// =========================
// 🔥 8. IMAGE COMPRESS (50KB / 100KB)
// =========================
function compressImage(maxKB){
let file = document.getElementById("upload").files[0];

if(!file){
alert("Upload image");
return;
}

let reader = new FileReader();
let img = new Image();

reader.onload = e => img.src = e.target.result;

img.onload = function(){
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");

canvas.width = img.width;
canvas.height = img.height;

ctx.drawImage(img,0,0);

let quality = 0.9;

function loop(){
canvas.toBlob(blob=>{
if(blob.size <= maxKB*1024 || quality < 0.1){

let url = URL.createObjectURL(blob);

let preview = document.getElementById("preview");
preview.src = url;
preview.style.display = "block";

let link = document.getElementById("download");
link.href = url;
link.style.display = "inline-block";

show("result","Size: "+(blob.size/1024).toFixed(2)+" KB");

}else{
quality -= 0.1;
loop();
}
},"image/jpeg",quality);
}

loop();
}

reader.readAsDataURL(file);
}


// =========================
// 🔥 9. IMAGE RESIZER
// =========================
function resizeImage(){
let file = document.getElementById("upload").files[0];
let w = document.getElementById("width").value;
let h = document.getElementById("height").value;

if(!file || !w || !h){
alert("Fill all fields");
return;
}

let reader = new FileReader();
let img = new Image();

reader.onload = e => img.src = e.target.result;

img.onload = function(){
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");

canvas.width = w;
canvas.height = h;

ctx.drawImage(img,0,0,w,h);

let url = canvas.toDataURL("image/jpeg");

let preview = document.getElementById("preview");
preview.src = url;
preview.style.display = "block";

let link = document.getElementById("download");
link.href = url;
link.style.display = "inline-block";
}

reader.readAsDataURL(file);
}


// =========================
// 🔥 10. JPG ↔ PNG CONVERTER
// =========================
function convertImage(type){
let file = document.getElementById("upload").files[0];

if(!file){
alert("Upload image");
return;
}

let reader = new FileReader();
let img = new Image();

reader.onload = e => img.src = e.target.result;

img.onload = function(){
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");

canvas.width = img.width;
canvas.height = img.height;

ctx.drawImage(img,0,0);

let url = canvas.toDataURL("image/" + type);

let preview = document.getElementById("preview");
preview.src = url;
preview.style.display = "block";

let link = document.getElementById("download");
link.href = url;
link.style.display = "inline-block";
}

reader.readAsDataURL(file);
}