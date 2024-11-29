(() => {
      console.log("loading timeTable.js")
    // document.body.style.border = "5px solid red";


    function saveToCalendar(shiftStart, shiftEnd, date, placeName) {
        const   currentYear = new Date().getFullYear();
        const   [day, month] = date.split("/");
        const   fullDate = `${currentYear}${month}${day}`;
        const   placeMap = new Map();
        placeMap.set("SML", "Saint Michel");
        placeMap.set("CLE", "Cardinal Lemoine");

        placeName = placeMap.get(placeName)
        const   eventName   = "TheGame"
        const   calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventName}&dates=${fullDate}T${shiftStart}00Z/${fullDate}T${shiftEnd}00Z&location=${placeName}&sf=true&output=xml`;

        console.log(`event name : ${eventName}`);
        console.log(`full date  : ${fullDate}`);
        console.log(`shiftStart : ${shiftStart}`);
        console.log(`shiftEnd   : ${shiftEnd}`);
        console.log(`calendarUrl: ${calendarUrl}`);
        window.open(calendarUrl, '_blank');
    }

    // getTimeTable.js
    // Think to change of place in the same day
    function getShift(dayColums, cellText) {
        const   cell        = dayColums.querySelectorAll('.cell');
        let     shiftStart  = 0;
        let     shiftEnd    = 0;
        const   shiftMap    = new Map();
        const   date        = cellText.slice(2, 7)
        let     placeName;

        shiftMap.set(1, "0915");
        shiftMap.set(2, "1105");
        shiftMap.set(3, "1250");
        shiftMap.set(4, "1435");
        shiftMap.set(5, "1620");
        shiftMap.set(6, "1805");
        shiftMap.set(7, "1950");
        shiftMap.set(8, "2135");
        shiftMap.set(9, "2330");

        cell.forEach((cell, cellIndex) => {

            const shift = cell.querySelector('.placeName');
            console.log(`cellIndex : ${cellIndex}`)
            if (shift) {
                shiftEnd = shiftMap.get(cellIndex + 1);
                placeName   = shift.innerText.trim();
                if ( shiftStart == 0 ) {
                    shiftStart = shiftMap.get(cellIndex);
                }

                console.log(`  Day Name: ${cellText.slice(2, 7)}`);
                console.log(`Schedule ${shiftMap.get(cellIndex)}`);
                console.log(`placeName : ${placeName}`)
            }
        })
        if (placeName)
            saveToCalendar(shiftStart, shiftEnd, date, placeName)
    }
    // Function to get the HTML source code of the current page
    function getTimeTable() {
        console.log("Get Page Source")
        document.body.style.border = "5px solid red";
        console.log("loading getTimeTable.js")

        const htmlSource = document.documentElement.outerHTML; // Get the entire HTML of the page

        // Create a new DOM parser
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlSource, 'text/html'); // Parse the HTML string into a document

        // Use query selector to find the <div class="title">
        const titleElement = doc.querySelector('.title'); // Adjust the selector based on the class name

        const dayColums = doc.querySelectorAll(".dayColumn");

        dayColums.forEach((dayColums, index) => {
            // console.log(`Day Column ${index}:`);

            /* Get cellDayName */
            const cellDayName = dayColums.querySelector('.cell.dayName');
            if (cellDayName) {
                dayName = cellDayName.querySelector('.hideOnDesktop');
                if (dayName) {
                    const cellText = dayName.innerText.trim(); // Get the text inside the cell
                    // console.log(`Day Column ${index}:`);
                    getShift(dayColums, cellText)
                }
            }
        });

        // Check if the element exists and retrieve its text content
        if (titleElement) {
            const titleText = titleElement.innerText; // Get the text inside the <div>
            console.log(titleText); // Log the title text to the
        } else {
            console.log('Title element not found.');
        }
    }

    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "getTimeTable") {
            console.log("Hello")
            getTimeTable();
        }
    });

})();
