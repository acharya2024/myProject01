$(document).ready(function () {
    $('.check-button').click(function () {
        let userAnswer = parseFloat($(this).siblings('.checkable-input').val());
        let correctAnswer = parseFloat($(this).data('answer'));

        if (userAnswer === correctAnswer) {
            $(this).addClass('btn-success').removeClass('btn-outline-secondary').html('Correct!');
            $(this).siblings('.checkable-input').prop('disabled', true);
            $(this).prop('disabled', true);


        } else {
            alert('Incorrect! Try again.');
            $(this).siblings('.checkable-input').val(''); // Clear the input box for retry

        }
    });
});