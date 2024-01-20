$(document).ready(() => {
    function updateValues(amount, total){
        $tipAmount = amount;
        $totalAmount = total;
        $('#amount').html(`$${amount.toFixed(2)}`);
        $('#total').html(`$${total.toFixed(2)}`)
    }
    var $tipPercentage = 0.00;
    var $bill = 0;
    var $numberOfPeople = 0;
    var $tipAmount = 0;
    var $totalAmount = 0
    // activating the buttons when they are pressed
    $('.tipButton').on('click',(event) => {
        // getting the button that is activated
        $('.activated').removeClass('activated');
        // adding the activated class to the pressed button
        $(event.currentTarget).addClass('activated');
    })
    // when the number of people input error is typed into
    $('#numberOfPeople').on('keyup', () => {
        // checking if Bill is typed into
        if ($('#bill').val() != "" && $('#numberOfPeople').val() != "")
        {
            // get the tip, bill and Number if people
            $tipPercentage = Number($('.activated').val().slice(0,-1)) / 100
            $bill = Number($('#bill').val())
            $numberOfPeople = Number($('#numberOfPeople').val());
            // calculate the tip amount
            $tipAmount = ($tipPercentage * $bill) / $numberOfPeople
            // calculating the total amount per person
            $totalAmount = ($bill*(1 + $tipPercentage))/ $numberOfPeople
            // update html
            updateValues($tipAmount, $totalAmount)
            // update the reset button
            $('.deactivated').addClass("activated");
            $('.deactivated').removeClass("deactivated");
            $('#resetButton').removeAttr('disabled');
        }
    })
    // resetting the calculator
    $("#resetButton").on('click', () => {
        $('#resetButton').addClass('deactivated');
        $('.activated').removeClass('activated');

        // removing the calculated values
        updateValues(0.00, 0.00);
        $('#bill').val("");
        $('#numberOfPeople').val("");
    })

})