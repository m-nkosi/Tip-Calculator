$(document).ready(() => {
    function updateValues(amount, total){
        $tipAmount = amount;
        $totalAmount = total;
        $('#amount').html(`$${amount.toFixed(2)}`);
        $('#total').html(`$${total.toFixed(2)}`)
    }
    function disableElments(){
        $('#resetButton').addClass('deactivated');

        updateValues(0.00, 0.00);
    }
    function doCalculations(typeOfCalculation) {
        if (typeOfCalculation === "predefined")
        {
            // get the tip, bill and Number if people
            $tipPercentage = Number($('.activated').val().slice(0,-1)) / 100

        }else {
            $tipPercentage = Number($('#custom').val()) / 100
        }
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
    var $tipPercentage = 0.00;
    var $bill = 0;
    var $numberOfPeople = 0;
    var $tipAmount = 0;
    var $totalAmount = 0
    // activating the buttons when they are pressed
    $('.tipButton').on('click',(event) => {
        // getting the button that is activated and deactivating it
        $('.activated').removeClass('activated');
        // $("#")
        // adding the activated class to the pressed button
        $(event.currentTarget).addClass('activated');
        // if the bill is inserted and number of people is inserted
        if ($("#numberOfPeople").val() != "" && $('#bill').val != "")
        {
            // if both have values calculate and update values
            doCalculations("predefined")
            // reactivating the resetButton
            $("#resetButton").addClass("activated");
        }else if ($('#numberOfPeople').val() === "")
        {
            $("#resetButton").addClass('activated');
        }
        $("#custom").val("");
    })
    // when the number of people input error is typed into
    $('#numberOfPeople').on('keyup', () => {
        // checking if Bill is typed into
        if ($('#bill').val() != "" && $('#numberOfPeople').val() != "")
        {
            if ($('#custom').val() === "")
            {
                doCalculations("predefined")
            }else{
                doCalculations();
            }
        }else if ($("#numberOfPeople").val() == "")
        {
            disableElments();
        }
    })
    // when the  bill is updated check the calculations
    $("#bill").on("keyup", () => {
        // check if the percentage is selected and the Number of people is inserted
        if ($('#numberOfPeople').val() != "" && $("#bill").val() != "")
        {
            if ($('#custom').val() === "")
            {
                doCalculations("predefined")
            }else{
                doCalculations();
            }
        }else if ($('#bill').val() === "")
        {
            disableElments();
        }

    })
    // resetting the calculator
    $("#resetButton").on('click', () => {


        // removing the calculated values
        $('.activated').removeClass('activated');
        disableElments();
        $('#bill').val("");
        $('#numberOfPeople').val("");
        $("#custom").val("");
    })
    // updating the percentage with custom values
    $("#custom").on("keyup", () => {
        // if it is not empty, remove the active button
        if ($("#custom").val() != "")
        {
            $(".activated").removeClass("activated");
            $("#resetButton").addClass("activated");
            doCalculations("custom");
        }
    })


})