# sansoor




<img src="http://s11.picofile.com/file/8392880326/00.gif"/>



include :

&#x3C;script src=&#x22;https://code.jquery.com/jquery-3.3.1.min.js&#x22;&#x3E;&#x3C;/script&#x3E;
&#x3C;script src=&#x22;sansoor.js&#x22;&#x3E;&#x3C;/script&#x3E;
&#x3C;link href=&#x22;css.css&#x22; type=&#x22;text/css&#x22; rel=&#x22;stylesheet&#x22; /&#x3E;

and 

put a filebox on body like this

&#x3C;div class=&#x22;filebox&#x22; style=&#x22;margin-left:auto;margin-right:auto&#x22;&#x3E;
&#x3C;img  src=&#x22;data:image/jpeg;base64,&#x3C;?php echo base64_encode(file_get_contents(&#x22;1.jpg&#x22;)) ?&#x3E;&#x22;&#x3E;
&#x3C;script&#x3E;
OnSave(function (elem,res) {
  
    // res : base64 encoded output
&#x9;// elem : filebox element
  
  
&#x9;$.post(&#x27;save.php&#x27;,
    {
&#x9;&#x9;fname: &#x60;&#x3C;?php echo $_GET[&#x27;file&#x27;]; ?&#x3E;&#x60; ,
         
        
        img : res
    }, function(data) {
        $(&#x22;.savex&#x22;, elem).text(&#x22;saved&#x22;);
    });

});
&#x3C;/script&#x3E;
&#x3C;/div&#x3E;
