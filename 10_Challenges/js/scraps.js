
    function requireOfflineMode() {
        const contentDiv = document.getElementById("content");
        const message = document.createElement("p");
        message.textContent = "Turn off your device's internet to see questions.";
        message.style.position = "absolute";
        message.style.top = "50%";
        message.style.left = "50%";
        message.style.transform = "translate(-50%, -50%)";
        message.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        message.style.padding = "10px 20px";
        message.style.border = "2px solid black";
        message.style.borderRadius = "8px";
        message.style.fontSize = "18px";
        message.style.textAlign = "center";
        message.style.fontWeight = "bold";
        message.style.zIndex = "1000";
    
        const updateVisibility = () => {
            if (!navigator.onLine) {
                contentDiv.style.visibility = "visible"; // Show content when offline
                if (message.parentElement) {
                    message.remove(); // Remove the message when offline
                }
            } else {
                contentDiv.style.visibility = "hidden"; // Hide content when online
                if (!message.parentElement) {
                    document.body.appendChild(message); // Add message over all content
                }
            }
        };
    
        // Initial check
        updateVisibility();
    
        // Monitor network changes
        window.addEventListener("online", updateVisibility);
        window.addEventListener("offline", updateVisibility);
    }
    
        
    //requireOfflineMode()