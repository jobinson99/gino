var rnd = Math.random;
function rgb() {
   return Math.floor(rnd()*256).toString();
}
ctx.fillStyle = "rgb(" + rgb() + "," + rgb() + "," + rgb() + ")";
ctx.fillRect(width * rnd(), height * rnd(), rnd() * height/4, rnd() * width/4); 
