// Sending account creation requests.
function send(form){
  console.log("wow");
}



// Form validation for account creation.
$('.account-form').validate({
  errorPlacement: function(error, element){
    var id = element.attr('id') + 'label';
    var wow = $('#' + id);

    element.parent().addClass('has-danger has-success');
    element.addClass('form-control-danger');

    wow.replaceWith(error);
  },
  success: function(label, element){

    var element = $(element);
    element.parent().removeClass('has-danger');
    element.parent().addClass('has-success');

    element.removeClass('form-control-danger');
    element.addClass('form-control-success');
  },
  submitHandler: function(form){
    send(form);
  },
  errorElement: 'small',
  errorClass: "text-danger",
  debug: true,
  rules: {
    username:{
      required: true,
      minlength: 6,
      maxlength: 16
    },
    pw1:{
      required: true,
      minlength: 8
    },
    pw2:{
      required: true,
      equalTo: pw1
    }
  }

})
