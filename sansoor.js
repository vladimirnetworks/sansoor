$(document).ready(function() {



    brush_size = 50;
    activedoc = 0;

    history = {};
    docs = [];

    moveobj = false;
    isdown = false

    mouseX = 0
    mouseY = 0

    document.onkeydown = capkey;

    $(".filebox").each(function(index) {


        var objx = $(this);




        objx.editboxid = index;
        docs.push(objx);




        var img = $("img", $(this))[0];



        var mime = img.src.match(new RegExp('data:' + "(.*)" + ';'))[1];



        var w = img.naturalWidth;
        var h = img.naturalHeight;

        var ratio = w / h;

        objx.css({
            "width": w + "px",
            "height": h + "px"
        });

        var tools = ` 
		
   	   <input class="file_width" type="text" maxlength="4" size="4" value="` + w + `">
	   X
	   <input class="file_height" type="text" maxlength="4" size="4" value="` + h + `">
	   <button class="resizeit">resize</button>
	    <button class="savex">save</button>
	   
	   <br>
	   <br><br>
	   
		<div class="contain_box" style="position:relative;height:` + h + `px;width:` + w + `px">
		
       <div class="croptop">
	     <div style="position:absolute;width:100%;height:10px;top:-10px;background-color:blue"></div>
	   </div>
	   
	   <div class="cropbutt">
	    <div style="position:absolute;width:100%;height:10px;bottom:-10px;background-color:blue"></div>
	   </div>
	   
	   
	   
	   <div class="cropleft">
	     <div style="position:absolute;height:100%;width:10px;left:-10px;background-color:blue"></div>
	   </div>
	   
	   
	   <div class="cropright">
	     <div style="position:absolute;height:100%;width:10px;right:-10px;background-color:blue"></div>
	   </div>
	   
	  
	   
       <canvas class="edit_box crsr" width="` + w + `" height="` + h + `" ></canvas>
	   
	   </div>
	   
       <canvas class="cropbox" width="` + w + `" height="` + h + `" ></canvas>
	   <input class="scale" type="range" min="1" max="1000" value="100" style="display:none">
	   
	
	   
	   <br><br>
	   
	  
	   `;

        $(this).append(tools);

        var exitbox_canvas = $(".edit_box", $(this))[0];



        objx[0].exitbox_canvas = exitbox_canvas;


        editbox_contenxt = exitbox_canvas.getContext("2d");


        objx[0].editbox_contenxt = editbox_contenxt;


        resize = function(neww, newh) {

            var idate = objx[0].editbox_contenxt.getImageData(0, 0, w, h);


            var tcanvas = document.createElement('canvas');
            tcanvas.height = h;
            tcanvas.width = w;
            var tcanvas_context = tcanvas.getContext("2d");
            tcanvas_context.putImageData(idate, 0, 0);


            objx[0].exitbox_canvas.height = newh;
            objx[0].exitbox_canvas.width = neww;
            editbox_contenxt.drawImage(
                tcanvas,


                0,
                0,

                w, h, 0, 0, neww, newh);

            w = neww;
            h = newh;

            $(".cropbox", objx).css({
                "width": neww + "px",
                "height": newh + "px"
            });

            $(".contain_box", objx).css({
                "width": neww + "px",
                "height": newh + "px"
            });


            objx.css({
                "width": neww + "px",
                "height": newh + "px"
            });

            makeblurr();

            //cropingH = h;
            //cropingW = w;

            cropingW = $(".cropright", objx)[0].offsetLeft - $(".cropleft", objx)[0].offsetLeft;
            cropingH = $(".cropbutt", objx)[0].offsetTop - $(".croptop", objx)[0].offsetTop;

        }


        var cropingH = h;
        var cropingW = w;



        changeH = function(h) {
            $(".file_width", objx).val(Math.round(h * ratio));
        }


        $(".file_height", objx).on("keyup paste", function(e) {

            changeH($(".file_height", objx).val());

        });

        changeW = function(w) {
            $(".file_height", objx).val(Math.round(w / ratio));
        }

        $(".file_width", objx).on("keyup paste", function(e) {

            changeW($(".file_width", objx).val());

        });


        $(".resizeit", $(this)).click(function(c) {

            resize($(".file_width", objx).val(), $(".file_height", objx).val())

        });

        $(".savex", $(this)).click(function(c) {

            $(this).text("saving ...");



            var tcropingW = cropingW + 20;
            var tcropingH = cropingH + 20;

            if (tcropingH > h || tcropingH < 1) {
                tcropingH = h;
            }

            if (tcropingW > w || tcropingW < 1) {
                tcropingW = w;
            }




            targetH = tcropingH
            targetW = tcropingW


            var tcanvas = document.createElement('canvas');
            tcanvas.height = targetH;
            tcanvas.width = targetW;




            tcanvas.getContext("2d").drawImage(
                $(".edit_box", objx)[0],


                $(".cropleft", objx)[0].offsetLeft,
                $(".croptop", objx)[0].offsetTop,

                tcropingW, tcropingH, 0, 0, targetW, targetH);




            savefunc[objx.editboxid](objx, tcanvas.toDataURL(mime))




        });


        $(".croptop", $(this)).on("mousedown", function(event) {
            moveobj = $(this);
        });


        $(".croptop", $(this)).on("mouseup", function(event) {
            moveobj = false;

            cropingH = $(".cropbutt", objx)[0].offsetTop - $(".croptop", objx)[0].offsetTop;

        });

        $(".croptop", $(this)).on("mousemove", function(e) {



            if (moveobj) {
                moveobj.css({
                    "top": e.pageY - $(".contain_box", objx)[0].offsetTop + "px"
                });
            }
        });

        $(".croptop", $(this)).on("mouseout", function(e) {

        });

        $(".cropbutt", $(this)).on("mousedown", function(event) {
            moveobj = $(this);
        });


        $(".cropbutt", $(this)).on("mouseup", function(event) {
            moveobj = false;
            cropingH = $(".cropbutt", objx)[0].offsetTop - $(".croptop", objx)[0].offsetTop;
        });

        $(".cropbutt", $(this)).on("mousemove", function(e) {

            if (moveobj) {
                moveobj.css({
                    "top": e.pageY - 20 - $(".contain_box", objx)[0].offsetTop + "px"
                });
            }
        });

        $(".cropbutt", $(this)).on("mouseout", function(e) {

        });

        $(".cropright", $(this)).on("mousedown", function(event) {
            moveobj = $(this);
        });


        $(".cropright", $(this)).on("mouseup", function(event) {
            moveobj = false;
            cropingW = $(".cropright", objx)[0].offsetLeft - $(".cropleft", objx)[0].offsetLeft;
        });

        $(".cropright", $(this)).on("mousemove", function(e) {

            if (moveobj) {
                moveobj.css({
                    "left": e.pageX - 20 - $(".contain_box", objx)[0].offsetLeft + "px"
                });
            }
        });

        $(".cropright", $(this)).on("mouseout", function(e) {

        });


        $(".cropleft", $(this)).on("mousedown", function(event) {
            moveobj = $(this);
        });


        $(".cropleft", $(this)).on("mouseup", function(event) {
            moveobj = false;
            cropingW = $(".cropright", objx)[0].offsetLeft - $(".cropleft", objx)[0].offsetLeft;
        });

        $(".cropleft", $(this)).on("mousemove", function(e) {

            if (moveobj) {
                moveobj.css({
                    "left": e.pageX - $(".contain_box", objx)[0].offsetLeft + "px"
                });
            }
        });

        $(".cropleft", $(this)).on("mouseout", function(e) {

        });



        editbox_contenxt.drawImage(img, 0, 0);




        makeblurr = function() {

            objx[0].blured_canvas = document.createElement('canvas');
            objx[0].blured_canvas.height = h;
            objx[0].blured_canvas.width = w;
            var blured_context = objx[0].blured_canvas.getContext("2d");
            blured_context.drawImage(objx[0].exitbox_canvas, 0, 0);
            blur(objx[0].blured_canvas);

        }

        //blurr

        makeblurr();



        exitbox_canvas.addEventListener("mousemove", function(e) {



            moveobj = false;
            ehanlder('move', e, objx)
        }, false);
        exitbox_canvas.addEventListener("mousedown", function(e) {
            ehanlder('down', e, objx)
        }, false);
        exitbox_canvas.addEventListener("mouseup", function(e) {




            history[objx.editboxid].push(editbox_contenxt.getImageData(0, 0, w, h));


            ehanlder('up', e, objx)
        }, false);
        exitbox_canvas.addEventListener("mouseout", function(e) {
            ehanlder('out', e, objx)
        }, false);


        // not needed becaus we load form base64 .. 
        //img.onload = function() {};

        if (typeof maxW !== 'undefined' && maxW < w) {
            changeW(maxW);
            $(".file_width", objx).val(maxW)
            resize($(".file_width", objx).val(), $(".file_height", objx).val())
        }


        history[objx.editboxid] = [];
        history[objx.editboxid].push(editbox_contenxt.getImageData(0, 0, w, h));



    });

    makebrushx(brush_size);




});


function blur(c) {


    var ctx = c.getContext("2d");
    ctx.globalAlpha = 0.3;

    var offset = 10;

    for (var i = 1; i <= 40; i += 1) {
        ctx.drawImage(c, offset, 0, c.width - offset, c.height, 0, 0, c.width - offset, c.height);
        ctx.drawImage(c, 0, offset, c.width, c.height - offset, 0, 0, c.width, c.height - offset);
    }

};



function draw(elem) {


    var cropX = mouseX - Math.round(brush_size / 2);
    var cropY = mouseY - Math.round(brush_size / 2);


    var brsh = elem[0].blured_canvas.getContext("2d").getImageData(cropX, cropY, brush_size, brush_size);

    var tcanvas = document.createElement('canvas');
    var tcanvas_context = tcanvas.getContext("2d");


    tcanvas_context.putImageData(brsh, 0, 0);


    tcanvas_context.globalCompositeOperation = 'destination-in';
    tcanvas_context.beginPath();
    tcanvas_context.arc(brush_size / 2, brush_size / 2, brush_size / 2, 0, Math.PI * 2);
    tcanvas_context.closePath();
    tcanvas_context.fill();


    elem[0].editbox_contenxt.drawImage(tcanvas, mouseX - Math.round(brush_size / 2), mouseY - Math.round(brush_size / 2));




}


function ehanlder(res, e, elem) {




    var canvas = elem[0].exitbox_canvas;




    var ctx = canvas.getContext("2d");

    if (res == 'down') {



        mouseX = /*e.clientX*/ e.pageX - $(".contain_box", elem)[0].offsetLeft;
        mouseY = e.pageY - $(".contain_box", elem)[0].offsetTop;

        isdown = true;



        draw(elem);
    }

    if (res == 'up') {



    }

    if (res == 'up' || res == "out") {
        isdown = false;

    }
    if (res == 'move') {

        mouseX = e.pageX - $(".contain_box", elem)[0].offsetLeft;
        mouseY = e.pageY - $(".contain_box", elem)[0].offsetTop;




        if (moveobj) {

        }

        if (isdown) {




            draw(elem);
        }
    }


}


function capkey(e) {



    var evtobj = window.event ? event : e



    if (evtobj.keyCode == 90 && evtobj.ctrlKey) {

        var histor = history[activedoc];
        if (histor.length != 1) {
            histor.pop();
            var hit_hitstor = histor[histor.length - 1]
            docs[activedoc][0].editbox_contenxt.putImageData(hit_hitstor, 0, 0);
        }

    }

    if (evtobj.keyCode == 221) {
        brush_size = brush_size + 10;
        makebrushx(brush_size);
    }

    if (evtobj.keyCode == 219) {

        brush_size = brush_size - 10;
        if (brush_size < 0) {
            brush_size = 1;
        }
        makebrushx(brush_size);

    }
}

function makebrushx(z) {

    var z2 = Math.round(z / 2);
    var z3 = z2 - 1;
    var x = `.crsr { cursor:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="` + z + `" width="` + z + `"><circle cx="` + z2 + `" cy="` + z2 + `" r="` + z3 + `" stroke="black" stroke-width="1" fill="transparent" /></svg> ') ` + z2 + ` ` + z2 + `, crosshair; }`;



    var s = document.createElement("style");
    document.head.appendChild(s);

    s.textContent = x;



}

savefunc = [];

function OnSave(f) {
    savefunc.push(f);
}