Stripe.setPublishableKey('pk_test_7bXLA9ziwjeXfLgwjsedFbHb');


$(function() {
  var $form = $('#checkout-form');
  $form.submit(function(event) {
    // Disable the submit button to prevent repeated clicks:
      $('#charge-error').addClass('hidden');
    $form.find('button').prop('disabled', true);
      Stripe.card.createToken({
          number: $('#card-number').val(),
          cvc: $('#card-cvc').val(),
          exp_month: $('#card-expiry-month').val(),
          exp_year: $('#card-expiry-year').val(),
          name:$('#card-name').val()
      }, stripeResponseHandler);

    // Request a token from Stripe:
//    Stripe.card.createToken($form, stripeResponseHandler);

    // Prevent the form from being submitted:
    return false;
  });
});

function stripeResponseHandler(status, response) {
  var $form = $('#checkout-form');
  if (response.error) { // Problem!

    // Show the errors on the form:
    $('#charge-error').text(response.error.message);
    $('#charge-error').removeClass('hidden');
    $form.find('button').prop('disabled', false); // Re-enable submission

  } else { // Token was created!

    // Get the token ID:
    var token = response.id;

    // Insert the token ID into the form so it gets submitted to the server:
    $form.append($('<input type="hidden" name="stripeToken">').val(token));

    // Submit the form:
    $form.get(0).submit();
  }
};