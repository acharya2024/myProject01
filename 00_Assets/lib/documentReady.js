document.addEventListener('DOMContentLoaded', function () {
    // Select the controlCard and arrowButton elements by their IDs
    const controlCard = document.getElementById('controlCard');
    const arrowButton = document.getElementById('arrowButton');

    // Function to add the 'show' class to controlCard
    function showControlCard() {
        controlCard.classList.add('show');
    }

    // Function to remove the 'show' class from controlCard
    function hideControlCard() {
        controlCard.classList.remove('show');
    }

    // Function to handle input changes within controlCard
    function handleInputChange(event) {
        if (event.target && event.target.tagName === 'INPUT') {
            hideControlCard();
        }
    }

    // Add event listener for mouseover on arrowButton
    arrowButton.addEventListener('mouseover', showControlCard);

    // Add event listener for mouseleave on controlCard
    controlCard.addEventListener('mouseleave', hideControlCard);

    // Add event listeners for 'change' and 'input' events on inputs within controlCard
    controlCard.addEventListener('change', handleInputChange);
    controlCard.addEventListener('input', handleInputChange);
});
// function adjustCanvasForDPR() {
//     const dpr = window.devicePixelRatio || 1;
//     const rect = canvas.getBoundingClientRect();

//     // Set the actual canvas size in pixels
//     canvas.width = rect.width * dpr;
//     canvas.height = rect.height * dpr;

//     // Scale the drawing context to match the DPR
//     ctx.scale(dpr, dpr);
// }


//         // Call the function during initialization
//         adjustCanvasForDPR();