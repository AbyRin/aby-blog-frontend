$(() => {
  $('.sign_div').submit(() => {
    const email = $("input[name = 'email']").val();
    const password = $("input[name = 'password']").val();

    $.post('/index/doLogin', {
      email,
      password,
    }, (result) => {
      $('#form_msg').html(result);
      $('#form_msg').css('color', 'red');
      window.location.href = '/index';
    });

    return false;
  });
});
