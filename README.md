# sansoor

![](/demo.gif)

```

include :

<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="sansoor.js"></script>
<link href="css.css" type="text/css" rel="stylesheet" />

and 

put a filebox on body like this

<div class="filebox" style="margin-left:auto;margin-right:auto">
<img  src="data:image/jpeg;base64,<?php echo base64_encode(file_get_contents("1.jpg")) ?>">
<script>
OnSave(function (elem,res) {
  
    // res : base64 encoded output
	// elem : filebox element
  
  
	$.post('save.php',
    {
		fname: `<?php echo $_GET['file']; ?>` ,
         
        
        img : res
    }, function(data) {
        $(".savex", elem).text("saved");
    });

});
</script>
</div>
```
