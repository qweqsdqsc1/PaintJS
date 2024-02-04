const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
//context is paint brush
const ctx = canvas.getContext("2d");
const color = document.getElementById("color")
const colorOption = Array.from(document.getElementsByClassName("color-option"))
// document.getElementsByClassName("color-option") => HTML collection
// Array.from => makes it array
const modeBtn = document.getElementById("mode-btn")
const destroyBtn = document.getElementById("destroy-btn")
const eraserBtn = document.getElementById("eraser-btn")
const fileInput = document.getElementById("file")
const textInput = document.getElementById("text")
const saveBtn = document.getElementById("save")




canvas.width = 600;
canvas.height = 800;
ctx.lineWidth=lineWidth.value;
ctx.lineCap = "round"
let isPainting = false;
let isFilling = false;




function onMove(event){
    if (isPainting){
        ctx.lineTo(event.offsetX, event.offsetY)
        ctx.stroke();
        return;

    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY)

}

function onMouseDown(){
    isPainting = true;

}

function cancelPainting(){
    isPainting = false;

}
function onLineWidthChange (event){    
    ctx.lineWidth = event.target.value
}

function onColorChange (event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;

}

function onColorClick(event){  
    const colorValue = event.target.dataset.color  
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue
    /* class = "color-option" 
    style="background-color:#f1c40f ;" 
    data-color = "#f1c40f"></div>  => if u use "a" instead of "color", it would be event.target.dataset.a*/   

}

function onModeClick () {
    if (isFilling){
        isFilling= false
        modeBtn.innerText = "Fill"
    } else {
        isFilling = true
        modeBtn.innerText = "Draw"
    }

}



function onCanvasClick() {
    if(isFilling){
        ctx.fillRect(0,0,canvas.width,canvas.height)
    }
}

function onDestroyClick (){
    ctx.fillStyle = "white"
    ctx.fillRect(0,0,canvas.width,canvas.height)

}
function onEraserClick(){
    ctx.strokeStyle = "white";
    isFilling = false
    modeBtn.innerText = "Fill"


}

function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file)
    const image = new Image(); // = <img src=""/> on HTML
    image.src = url;
    image.onload= function(){
        ctx.drawImage(image,0,0, canvas.width, canvas.height)
        fileInput.value = null;
    }

}

function onDoubleClick(event){      
    const text =textInput.value
    if (text !=="") {
        ctx.save()
        ctx.lineWidth = 1;
        ctx.font = `${lineWidth.value * 7}px serif`
        ctx.fillText(text, event.offsetX,event.offsetY);
        ctx.restore();
    }
}

function onSaveClick (){
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();


}





canvas.addEventListener("dblclick", onDoubleClick)
canvas.addEventListener("mousemove", onMove)
//=canvas.onmousemove = onMove
canvas.addEventListener("mousedown", onMouseDown)
canvas.addEventListener("mouseup", cancelPainting)
canvas.addEventListener("mouseleave", cancelPainting)
canvas.addEventListener("click", onCanvasClick)

lineWidth.addEventListener("change", onLineWidthChange)
color.addEventListener("change", onColorChange)

colorOption.forEach(color => color.addEventListener('click', onColorClick))

modeBtn.addEventListener("click", onModeClick)
destroyBtn.addEventListener("click", onDestroyClick)
eraserBtn.addEventListener("click", onEraserClick)

fileInput.addEventListener("change", onFileChange)
saveBtn.addEventListener("click", onSaveClick)



//change font between stroke, fill
// pencil that make some shape




/*
ctx.moveTo(0,0)

const colors = []

function onClick(event){
    ctx.beginPath()
    ctx.moveTo(Math.floor(Math.random()*800),Math.floor(Math.random()*800))
    let color = '#' + Math.floor(Math.random()*16777215).toString(16);
    ctx.strokeStyle=color;

    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke()
}


canvas.addEventListener("mousemove", onClick)*/
