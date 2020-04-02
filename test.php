<!doctype html>
<html>
<head>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="sansoor.js"></script>
<link href="css.css" type="text/css" rel="stylesheet" />
</head>
<body>
<script>
maxW = 500;
</script>

<div class="filebox" style="margin-left:auto;margin-right:auto">
<?php
$filecontent = "";
$mime = "";
if (isset($_GET['file']) && is_file($_GET['file'])) {
	$fileinfo = getimagesize($_GET['file']);
	if ($fileinfo['mime'] == 'image/jpeg' || $fileinfo['mime'] == 'image/jpg' || $fileinfo['mime'] == 'image/png') {
	
		$mime = $fileinfo['mime'];
		$filecontent = base64_encode(file_get_contents($_GET['file']));
	
	}
}
?>
<img  src="data:<?php echo $mime; ?>;base64,<?php echo $filecontent; ?>">
<script>
OnSave(function (elem,res) {
	
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

</body>
</html>
