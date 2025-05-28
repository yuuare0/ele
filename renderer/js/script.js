$(document).ready(function () {
  $('#login-button').click(function () {
    const username = $('#login-username').val();
    const password = $('#login-password').val();

    $.ajax({
      url: 'http://localhost:3002/login',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ username, password }),
      success: function (data) {
        alert(data.message);
      },
      error: function (xhr) {
        alert(xhr.responseJSON?.message || 'Login failed');
      }
    });
  });

  $('#signup-button').click(function () {
    const username = $('#signup-username').val();
    const password = $('#signup-password').val();

    $.ajax({
      url: 'http://localhost:3002/signup',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ username, password }),
      success: function (data) {
        alert(data.message);
      },
      error: function (xhr) {
        alert(xhr.responseJSON?.message || 'Signup failed');
      }
    });
  });

  // window.api 객체가 preload.js에서 노출됨

  // 메인 프로세스로 메시지 보내기
  $('#send-button').click(() => {
    const msg = $('#message-input').val();
    window.api.send('toMain', msg);
  });

  // 메인 프로세스에서 응답 받기
  window.api.receive('fromMain', (data) => {
    alert('메인에서 온 메시지: ' + data);
  });

});
