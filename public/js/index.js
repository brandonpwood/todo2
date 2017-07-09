// Draw todo lists.
function draw(todos){
  if(todos){
    $('.todo').html('');
    
  }
}

// Call for data if available.
function data(){
  $.ajax({
    type: 'POST',
    url: '/data',
    success: function(response , stats){
      if(response){

      }
    }
  });
}

// Sending account creation requests.
function send(form){
  var data = {
    username: form.username.value,
    password: form.pw1.value
  };

  $.ajax({
  type: 'POST',
  url: '/createaccount',
  data: data,
  success: function(response, status){
    if(response === 'Success!'){

    }else{
      alert(status)
    }
  }
  });
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
  errorClass: 'text-danger',
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
