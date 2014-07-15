function readCatalog(file){
	var catFile = new XMLHttpRequest();
	catFile.open("GET",file, true);
	if (catFile.readyState === 4){   // Makes sure the document is ready to parse.
    	if (catFile.status === 200 || catFile.status == 0) {  // Makes sure it's found the file.
			var catText = catFile.responseText;
			//alert(allText);
			return catText;
		}
	
	}
	catFile.send(null);

}
function readBlogTxt(file){
	var txtFile = new XMLHttpRequest();
	txtFile.open("GET",file, true);
	txtFile.onreadystatechange = function() {
	if (txtFile.readyState === 4){   // Makes sure the document is ready to parse.
    	if (txtFile.status === 200 || txtFile.status == 0) {  // Makes sure it's found the file.
			var allText = txtFile.responseText;
			//alert(allText);
			document.getElementById("blog").innerHTML = "<p>" + allText + "</p";
		}
	
	}
	txtFile.send(null);
}