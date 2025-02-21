(async () => {
    // gives the download link for a given branch once the Everest version list was fetched, or null if no build was found
    const getLinkForBranch = (versionList, branch) => {
        const matchingVersions = versionList.filter(version => version.branch === branch);

        if (matchingVersions.length !== 0) {
            return matchingVersions[0];
        }
        return null;
    };

    // === Fetch link to Everest

    {
        // a static file on this website indicates to Everest and Olympus where the Everest versions list is provided,
        // so load the URL from there as well...
        const updaterUrlFetch = await fetch("/everestupdater.txt");

        if (updaterUrlFetch.ok) {
            // ... then call it.
            const updaterUrl = await updaterUrlFetch.text();
            const versionListFetch = await fetch(updaterUrl.trim() + "?supportsNativeBuilds=true");

            if (versionListFetch.ok) {
                const versionList = await versionListFetch.json();

                const stable = getLinkForBranch(versionList, "stable").mainDownload;
                const beta = getLinkForBranch(versionList, "beta").mainDownload;
                const dev = getLinkForBranch(versionList, "dev").mainDownload;

                // if all versions have an existing build...
                if (stable !== null && beta !== null && dev !== null) {
                    // set the links to their artifacts
                    document.getElementById("latest-stable-link").href = stable;
                    document.getElementById("latest-beta-link").href = beta;
                    document.getElementById("latest-dev-link").href = dev;

                    // remove the line saying "Click the '1 published' button under 'Related', then 'main' to download it." since those are now direct links.
                    var artifactInstructions = document.getElementById("artifact-instructions");
                    artifactInstructions.parentNode.removeChild(artifactInstructions);
                }
            }
        }
    }


    // === Fetch link to Olympus

    {
        const updaterUrlFetch = await fetch("/olympusupdater.txt");

        if (updaterUrlFetch.ok) {
            // ... then call it.
            const updaterUrl = await updaterUrlFetch.text();
            const versionListFetch = await fetch(updaterUrl.trim());

            if (versionListFetch.ok) {
                const versionList = await versionListFetch.json();

                const stable = getLinkForBranch(versionList, "stable");

                if (stable !== null) {
                    // set the links to the latest stable
                    document.getElementById("olympus-macos-latest-link").href = stable.macosDownload;
                    document.getElementById("olympus-linux-latest-link").href = stable.linuxDownload;

                    // remove the line saying "Click the '5 published' button under 'Related', then '...main' to download it." since those are now direct links.
                    const artifactInstructionsMacOS = document.getElementById("olympus-macos-artifact-instructions");
                    artifactInstructionsMacOS.parentNode.removeChild(artifactInstructionsMacOS);
                    const artifactInstructionsLinux = document.getElementById("olympus-linux-artifact-instructions");
                    artifactInstructionsLinux.parentNode.removeChild(artifactInstructionsLinux);
                }
            }
        }
    }
})();

{
    // handling for the macOS instructions foldable section
    const fold = document.getElementById("mac-instructions-fold");
    const icon = document.getElementById("mac-instructions-fold-icon");
    let folded = false;

    const toggle = () => {
        if (folded) {
            // unfold
            icon.innerText = "-";
            fold.style.display = "block";
            folded = false;
        } else {
            // fold
            icon.innerText = "+";
            fold.style.display = "none";
            folded = true;
        }
    };

    document.getElementById("mac-instructions-fold-trigger").addEventListener("click", e => {
        e.preventDefault();
        toggle();
    });

    // the section is unfolded by default in the HTML, but we want it folded by default if JS is enabled
    toggle();
}