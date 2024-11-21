

// /*
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
        })
        $(document).ready(function () {
    // Initialize
    $('.accordion-button:first').removeClass('locked').addClass('unlocked');
    $('.accordion-button:not(:first)').addClass('locked');

    $('.accordion-collapse').each(function () {
        var id = $(this).attr('id');
        if (getCookie(id) === 'true') {
            $(this).prev('.accordion-header').find('.accordion-button').removeClass('locked').addClass('read');
        }
    });

    var timers = {};  // Store timers for each accordion
var elapsedTimes = {};  // Store elapsed times for each accordion

$('.accordion-collapse').on('shown.bs.collapse', function () {
    var id = $(this).attr('id');
    var readTime = parseInt($(this).closest('.accordion-item').attr('data-read-time'));
    var isRead = getCookie(id);
    var timeSpent = elapsedTimes[id] || 0;  // Start from the stored elapsed time, if available
    var headerBtn = $(`#${id}`).prev('.accordion-header').find('.accordion-button');
    var originalText = headerBtn.text();

    if (isRead !== 'true') {
        timers[id] = setInterval(function () {
            timeSpent++;
            elapsedTimes[id] = timeSpent;  // Store the elapsed time
            headerBtn.text(originalText + ' (' + timeSpent + '/' + readTime + ')');
            if (timeSpent >= readTime) {
                clearInterval(timers[id]);
                setCookie(id, 'true', 365);
                headerBtn.removeClass('unlocked').addClass('read');
                unlockNextAccordion(id);
            }
        }, 1000);
    }
});

$('.accordion-collapse').on('hidden.bs.collapse', function () {
    var id = $(this).attr('id');
    if (timers[id]) {
        clearInterval(timers[id]);
    }
});


    function unlockNextAccordion(currentAccordionId) {
        $('#' + currentAccordionId).closest('.accordion-item').next('.accordion-item').find('.accordion-button').removeClass('locked').addClass('unlocked');
    }

    // Cookie functions
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
});
// */
