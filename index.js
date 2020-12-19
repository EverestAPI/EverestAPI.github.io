{
	// this looks ugly, but filter(version => version.sourceBranch === branch) gives a syntax error on IE 11.
	// this code works on IE 10 and later.
	function extractVersionsList(json, branch) {
		return json.value
			.filter(function(version) { return version.sourceBranch === branch; })
			.map(function(version) { return version.id; });
	}

	var xhttpEverest = new XMLHttpRequest();
	xhttpEverest.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			// parse the response
			var json = JSON.parse(this.responseText);

			// get the dev, beta and stable build IDs
			var devVersions = extractVersionsList(json, "refs/heads/dev");
			var betaVersions = extractVersionsList(json, "refs/heads/beta");
			var stableVersions = extractVersionsList(json, "refs/heads/stable");

			// if both are present...
			if (devVersions.length !== 0 && betaVersions.length !== 0 && stableVersions.length !== 0) {
				// set the links to their artifacts
				document.getElementById("latest-dev-link").href = "https://dev.azure.com/EverestAPI/Everest/_apis/build/builds/" + devVersions[0] + "/artifacts?artifactName=main&$format=zip"
				document.getElementById("latest-beta-link").href = "https://dev.azure.com/EverestAPI/Everest/_apis/build/builds/" + betaVersions[0] + "/artifacts?artifactName=main&$format=zip"
				document.getElementById("latest-stable-link").href = "https://dev.azure.com/EverestAPI/Everest/_apis/build/builds/" + stableVersions[0] + "/artifacts?artifactName=main&$format=zip"

				// remove the line saying "Click the '1 published' button under 'Related', then 'main' to download it." since those are now direct links.
				var artifactInstructions = document.getElementById("artifact-instructions");
				artifactInstructions.parentNode.removeChild(artifactInstructions);
			}
		}
	};

	// run a request to Azure to get the latest dev/beta/stable IDs, to turn the download links into direct links.
	xhttpEverest.open("GET", "https://dev.azure.com/EverestAPI/Everest/_apis/build/builds", true);
	xhttpEverest.send();

	// now let's do the same for Olympus

	var xhttpEverest = new XMLHttpRequest();
	xhttpEverest.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			// parse the response
			var json = JSON.parse(this.responseText);

			// get the stable, main and dev build IDs
			var stableVersions = extractVersionsList(json, "refs/heads/stable");
			var mainVersions = extractVersionsList(json, "refs/heads/main");
			var devVersions = extractVersionsList(json, "refs/heads/dev");

			// grab whichever exists
			var id = stableVersions[0] || mainVersions[0] || devVersions[0]
			if (id) {
				// set the links to their artifacts
				document.getElementById("olympus-macos-latest-link").href = "https://dev.azure.com/EverestAPI/Olympus/_apis/build/builds/" + id + "/artifacts?artifactName=macos.main&$format=zip"
				document.getElementById("olympus-linux-latest-link").href = "https://dev.azure.com/EverestAPI/Olympus/_apis/build/builds/" + id + "/artifacts?artifactName=linux.main&$format=zip"

				// remove the line saying "Click the '5 published' button under 'Related', then '...main' to download it." since those are now direct links.
				var artifactInstructions = document.getElementById("olympus-macos-artifact-instructions");
				artifactInstructions.parentNode.removeChild(artifactInstructions);
				artifactInstructions = document.getElementById("olympus-linux-artifact-instructions");
				artifactInstructions.parentNode.removeChild(artifactInstructions);
			}
		}
	};

	// run a request to Azure to get the latest stable/main/dev IDs, to turn the download links into direct links.
	xhttpEverest.open("GET", "https://dev.azure.com/EverestAPI/Olympus/_apis/build/builds", true);
	xhttpEverest.send();
}
