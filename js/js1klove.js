// initialisation
if (typeof palette === "undefined")
{
   var paletteoffset = 0,
       palette = [];
   
   for (var i=0; i<256; i++)
   {
      palette[i] = "rgb(255," + ~~(128-(i*.5)) + "," + (255-i) + ")";
      palette[i+256] = "rgb(255," + (255-i) + ",255)";
   }
}

var dist = function dist(a, b, c, d)
{
   return Math.sqrt((a - c) * (a - c) + (b - d) * (b - d));
}

// plasma source width and height
var pwidth = 32, pheight = pwidth * (height/width);
// scale the plasma source to the canvas width/height
var vpx = width/pwidth, vpy = height/pheight;
var time = Date.now() / 64;

var mix = Math.sin(time*0.05);

var colour = function colour(x, y)
{
   // mix between two plasma functions using a sine wave
   var f1 = ((Math.sin(dist(x + time, y, 128.0, 128.0) / 8.0)
           + Math.sin(dist(x - time, y, 64.0, 64.0) / 8.0)
           + Math.sin(dist(x, y + time / 7, 192.0, 64) / 7.0)
           + Math.sin(dist(x, y, 192.0, 100.0) / 8.0)) + 4) * 32;
   var f2 = (128 + (128 * Math.sin(x * 0.0625)) +
           128 + (128 * Math.sin(y * 0.03125)) +
           128 + (128 * Math.sin(dist(x + time, y - time, width, height) * 0.125)) +
           128 + (128 * Math.sin(Math.sqrt(x * x + y * y) * 0.125)) ) * 0.25;
   return (mix * f1) + ((1 - mix) * f2);
}

ctx.globalAlpha = 0.2;
// palette cycle speed
paletteoffset++;
var jitter = -4 + Math.random()*8;

// render plasma effect
for (var y=0,x; y<pheight; y++)
{
   for (x=0; x<pwidth; x++)
   {
      // map plasma pixels to canvas pixels using the virtual pixel size
      ctx.fillStyle = palette[~~(colour(x, y) + paletteoffset) % 512];
      ctx.fillRect(x * vpx + jitter, y * vpy + jitter, vpx, vpy);
   }
}

// plot parametric heart curve
for (var x,y,p,z=Math.abs(mix*(width/64)),t=0; t<100; t+=0.25)
{
   x = 15 * Math.pow(Math.sin(t),3);
   y = 13 * Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4 *t);
   ctx.fillStyle = palette[512-(~~(colour(x, y) + paletteoffset) % 512)];
   ctx.fillRect(x*z + width/2, -y*z + height/2, 5, 5);
}
 
