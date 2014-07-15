function readCatalog(file,onComplete,onError){
	var catFile = new XMLHttpRequest();
	catFile.open("GET",file, true);
	catFile.onreadystatechange = function() {
		if (catFile.readyState === 4){   // Makes sure the document is ready to parse.
    		if (catFile.status === 200 || catFile.status == 0) {  // Makes sure it's found the file.
				var catText = catFile.responseText;
				alert("! " + allText);
				onComplete(catText);
				
			}
			else
				onError();
	
		}
		
	}
	catFile.send(null);

}

function readBlogTxt(file,onComplete,onError){
	var txtFile = new XMLHttpRequest();
	txtFile.open("GET",file, true);
	txtFile.onreadystatechange = function() {
		if (txtFile.readyState === 4){   // Makes sure the document is ready to parse.
    		if (txtFile.status === 200 || txtFile.status == 0) {  // Makes sure it's found the file.
				var allText = txtFile.responseText;
				alert("! " + allText);
				onComplete(allText);
			}
			else
				onError();
	
		}
		
	}
	txtFile.send(null);
}