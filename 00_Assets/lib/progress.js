$("response").click(function () {
        interactionDOM
        var response = $(this).attr("responseValue"), interactionDOM = $(this).parent(), ansKey = interactionDOM.attr("ansKey"), resultDOM = $(this).siblings("result"), result
        $(this).siblings("response").fadeOut("slow")
        if (response == ansKey) {
                result = (interactionDOM.attr("true-response")).split(/(?<=\.)\s/)
                $(this).removeClass("text-dark").removeClass("bg-light").addClass("bg-success").append("&#10003;")
        }
        else {
                result = (interactionDOM.attr("false-response")).split(/(?<=\.)\s/)
                $(this).removeClass("text-dark").removeClass("bg-light").addClass("bg-success").addClass("bg-danger").append("&#10007;")
        }
        new TypeIt(resultDOM[0], {
                strings: result,
                speed: 10,
                nextStringDelay: 1000,
                lifeLike: true,
                html: true,
                breakLines: true,
                afterComplete: function (instance) {
                        instance.destroy();
                },
                loop: false,
        }).go();
        $(".accordion-button").click(function () {
                // Calculate the offset of the target element
                var offset = $(".accordion-button").offset().top;

                // Scroll to the target element with a smooth animation
                $("html, body").animate({
                        scrollTop: offset
                }, 1000); // You can adjust the duration (in milliseconds) as needed
        });
})

$(document).ready(function () {
        // Handle navigation clicks
        $(".nav-link").on("click", function (event) {
            event.preventDefault(); // Prevent default anchor behavior
    
            const navLink = $(this); // Current nav-link clicked
            const container = navLink.closest(".model-container"); // Parent container
            const modelViewer = container.find(".model-viewer"); // Model viewer within the container
            const figCaption = container.find("figcaption"); // Figcaption to update
            // Parse data-links and data-captions attributes
            const links = JSON.parse(modelViewer.attr("data-links"));
            const captions = JSON.parse(modelViewer.attr("data-captions"));
    
            const index = navLink.data("index"); // Get the index from data-index
    
            // Update model-viewer src and figcaption
            if (index >= 0 && index < links.length) {
                modelViewer.attr("src", "blend/" + links[index]); // Update the 3D model src
                // Update the caption text
                figCaption.fadeOut(200, function () {
                        $(this).text(captions[index]).fadeIn(200);
                        MathJax.typesetPromise([figCaption[0]]); // Rerun MathJax for the updated caption
                    });
                    
    
                // Update active class for nav-tabs
                navLink.closest(".nav-tabs").find(".nav-link").removeClass("active");
                navLink.addClass("active");
            } else {
                console.error("Invalid index or data missing.");
            }
        });
    
        // Automatically click the first nav-item for each model-viewer on load
        $(".model-container").each(function () {
            const firstNavItem = $(this).find(".nav-link").first();
            firstNavItem.trigger("click");
        });
        document.querySelectorAll('p').forEach(p => {
                p.setAttribute('tabindex', '0');
              });
              
            
            
            
    });
    




//         $(document).ready(function () {
//     // Initialize
//     $('.accordion-button:first').removeClass('locked').addClass('unlocked');
//     $('.accordion-button:not(:first)').addClass('locked');

//     $('.accordion-collapse').each(function () {
//         var id = $(this).attr('id');
//         if (getCookie(id) === 'true') {
//             $(this).prev('.accordion-header').find('.accordion-button').removeClass('locked').addClass('read');
//         }
//     });

//     var timers = {};  // Store timers for each accordion
// var elapsedTimes = {};  // Store elapsed times for each accordion

// $('.accordion-collapse').on('shown.bs.collapse', function () {
//     var id = $(this).attr('id');
//     var readTime = parseInt($(this).closest('.accordion-item').attr('data-read-time'));
//     var isRead = getCookie(id);
//     var timeSpent = elapsedTimes[id] || 0;  // Start from the stored elapsed time, if available
//     var headerBtn = $(`#${id}`).prev('.accordion-header').find('.accordion-button');
//     var originalText = headerBtn.text();

//     if (isRead !== 'true') {
//         timers[id] = setInterval(function () {
//             timeSpent++;
//             elapsedTimes[id] = timeSpent;  // Store the elapsed time
//             headerBtn.text(originalText + ' (' + timeSpent + '/' + readTime + ')');
//             if (timeSpent >= readTime) {
//                 clearInterval(timers[id]);
//                 setCookie(id, 'true', 365);
//                 headerBtn.removeClass('unlocked').addClass('read');
//                 unlockNextAccordion(id);
//             }
//         }, 1000);
//     }
// });

// $('.accordion-collapse').on('hidden.bs.collapse', function () {
//     var id = $(this).attr('id');
//     if (timers[id]) {
//         clearInterval(timers[id]);
//     }
// });


//     function unlockNextAccordion(currentAccordionId) {
//         $('#' + currentAccordionId).closest('.accordion-item').next('.accordion-item').find('.accordion-button').removeClass('locked').addClass('unlocked');
//     }

//     // Cookie functions
//     function setCookie(name, value, days) {
//         var expires = "";
//         if (days) {
//             var date = new Date();
//             date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//             expires = "; expires=" + date.toUTCString();
//         }
//         document.cookie = name + "=" + (value || "") + expires + "; path=/";
//     }

//     function getCookie(name) {
//         var nameEQ = name + "=";
//         var ca = document.cookie.split(';');
//         for (var i = 0; i < ca.length; i++) {
//             var c = ca[i];
//             while (c.charAt(0) === ' ') c = c.substring(1, c.length);
//             if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
//         }
//         return null;
//     }
// Function to initialize hotspots for a given model-viewer
// function initializeHotspots(modelViewerId, hotspotSlot, alertMessage) {
//         const modelViewer = document.getElementById(modelViewerId);
        
//         if (!modelViewer) {
//             console.error(`ModelViewer with id="${modelViewerId}" not found.`);
//             return;
//         }
        
//         // Wait for the model-viewer to load
//         modelViewer.addEventListener("load", () => {
//             const hotspot = modelViewer.querySelector(`[slot="${hotspotSlot}"]`);
            
//             if (hotspot) {
//                 hotspot.style.cursor = "pointer"; // Indicate interactivity
//                 hotspot.addEventListener("click", () => {
//                     alert(alertMessage);
//                 });
//             } else {
//                 console.error(`Hotspot with slot="${hotspotSlot}" not found in modelViewer "${modelViewerId}".`);
//             }
//         });
// // Initialize hotspots for each model-viewer instance
// initializeHotspots("modelViewer1", "hotspot-12", "You clicked on hotspot 12!");
// Add more initializations as needed for other model-viewers
// initializeHotspots("modelViewer2", "hotspot-21", "You clicked on hotspot 21!");
// });
