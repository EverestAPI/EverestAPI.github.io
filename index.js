{
	// this looks ugly, but filter(version => version.sourceBranch === branch) gives a syntax error on IE 11.
	// this code works on IE 10 and later.
	function extractVersionsList(json, branch) {
		return json.value
			.filter(function(version) { return version.sourceBranch === branch; })
			.map(function(version) { return version.id; });
	}
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			// parse the response
			var json = JSON.parse(this.responseText);
			
			// get the master and stable build IDs
			var masterVersions = extractVersionsList(json, 'refs/heads/master');
			var stableVersions = extractVersionsList(json, 'refs/heads/stable');
			
			// if both are present...
			if (masterVersions.length !== 0 && stableVersions.length !== 0) {
				// set the links to their artifacts
				document.getElementById("latest-master-link").href = 'https://dev.azure.com/EverestAPI/Everest/_apis/build/builds/' + masterVersions[0] + '/artifacts?artifactName=main&api-version=5.0&%24format=zip'
				document.getElementById("latest-stable-link").href = 'https://dev.azure.com/EverestAPI/Everest/_apis/build/builds/' + stableVersions[0] + '/artifacts?artifactName=main&api-version=5.0&%24format=zip'
				
				// remove the line saying "Click the '1 published' button under 'Related', then 'main' to download it." since those are now direct links.
				var artifactInstructions = document.getElementById("artifact-instructions");
				artifactInstructions.parentNode.removeChild(artifactInstructions);
			}				
		}
	};
	
	// run a request to Azure to get the latest master and stable IDs, to turn the download links into direct links.
	xhttp.open("GET", "https://dev.azure.com/EverestAPI/Everest/_apis/build/builds?api-version=5.0", true);
	xhttp.send();
}
