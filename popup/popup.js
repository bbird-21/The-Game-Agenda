// import { getPageSource } from "./getTimeTable";

// popup.js
console.log("loading popus.js")

// document.getElementById('action-button').addEventListener('click', function() {
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//         chrome.tabs.executeScript(tabs[0].id, { code: "document.documentElement.outerHTML;" }, function(results) {
//             const sourceCode = results[0];
//             document.getElementById('source-code').textContent = sourceCode; // Display the source code in the popup
//         });
//     });
// });

function listenForClicks() {
	document.addEventListener("click", (e) => {
		console.log("listener")
		document.body.style.border = "5px solid green";

		function sendMessageGTT(tabs) {

			browser.tabs.sendMessage(tabs[0].id, {
				command: "getTimeTable",
			});


		}

		browser.tabs
			.query({ active: true, currentWindow: true })
			.then(sendMessageGTT)
			.catch(reportError);
	})

}



function reportExecuteScriptError(error) {
	document.querySelector("#popup-content").classList.add("hidden");
	document.querySelector("#error-content").classList.remove("hidden");
	console.error(`Failed to save entries to calendar: ${error.message}`);
}


browser.tabs
  .executeScript({ file: "/getTimeTable.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);


// document.getElementById('action-button').addEventListener('click', function() {
// })

