window.onload = function () {

    document.ontouchmove = function (e) { e.preventDefault(); }
    var canvas = document.getElementById("main");
    var canvastop = canvas.offsetTop;

    var selectedColor = "#000000";

    var cxt = canvas.getContext('2d');
    var lastx; var lasty;
    cxt.fillStyle = "#000000";
    cxt.strokeStyle = "#000000";
    // cxt.strokeStyle = selectedColor;
    cxt.lineCap = 'round';
    cxt.lineJoin = 'round';
    cxt.lineWidth = 5;



    function clear() {
        cxt.fillStyle = "#ffffff";
        cxt.rect(0, 0, 300, 300);
        cxt.fill();
    }

    function setcolor(event) {

        cxt.fillStyle = event.target.id;
        cxt.strokeStyle = event.target.id;

    }

    function dot(xx, y) {
        cxt.beginPath();
        // cxt.fillStyle = selectedColor;
        cxt.arc(x, y, 0, Math.PI * 2, true);
        cxt.fill();
        cxt.stroke();
        cxt.closePath();
    }

    function line(fromx, fromy, tox, toy) {
        cxt.beginPath();
        cxt.moveTo(fromx, fromy);
        cxt.lineTo(tox, toy);
        cxt.stroke();
        cxt.closePath();

    }

    canvas.ontouchstart = function (event) {
        event.preventDefault();
        lastx = event.touches[0].clientX;
        lasty = event.touches[0].clientY - canvastop;
        dot(lastx, lasty);
    }

    canvas.ontouchmove = function (event) {
        event.preventDefault();
        var newx = event.touches[0].clientX;
        var newy = event.touches[0].clientY - canvastop;
        line(lastx, lasty, newx, newy);
        lastx = newx;
        lasty = newy;
    }
    var buttons = {
        clear: document.getElementById('btnClear'),
        red: document.getElementById('red'),
        green: document.getElementById('green'),
        blue: document.getElementById('blue'),
        save: document.getElementById('save'),
        restore: document.getElementById('restore')
    }
    var imagedata;
    buttons.save.onclick = function () {
        imagedata = cxt.getImageData(0, 0, 300, 300);
        buttons.save.style.display = 'none';
        buttons.restore.style.display = 'inline';
    }
    buttons.restore.onclick = function () {
        cxt.putImageData(imagedata,0,0);
        buttons.save.style.display = 'inline';
        buttons.restore.style.display = 'none';
    }
    buttons.red.onclick = setcolor;
    buttons.blue.onclick = setcolor;
    buttons.green.onclick = setcolor;

    buttons.clear.onclick = clear;
    clear();


}