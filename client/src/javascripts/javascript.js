$(document).ready(function() {
    authPage()
})

// ---------------------------------------------------------------------------
// AUTHENTICATION
// ---------------------------------------------------------------------------

const Auth = {
    authenticateUser: (data) => {
        if (data.status === 'error') console.log('No account:', data)
        Auth.deauthenticateUser()
            // console.log('data:', data)
        localStorage.setItem('token', data.token)
            // console.log('token:', localStorage.getItem('token'))
    },
    isUserAuthenticated: () => {
        // console.log('token:', localStorage.getItem('token'))
        return localStorage.getItem('token') !== null
    },
    deauthenticateUser: () => {
        localStorage.removeItem('token')
    },
    getToken: () => {
        return localStorage.getItem('token')
    },
    getUser: () => {
        let token = Auth.getToken()
        if (!token) return {}
        else {
            return jwt_decode(token)
        }
    }
}


function formRegister() {
    $('#main-container').empty()
    html = ''
    html += `
<div class="jumbotron">
<ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link active" href="#" onclick='formRegister()'>Register</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#" onclick='formLogin()'>Login</a>
  </li>
</ul>
<h1 class="text-center">Register</h1>
<form id="form-register">
  <div class="form-group">
      <label for="email">Email</label>
      <input type="email" class="form-control" id="input-email-register" placeholder="Enter Email" name='email'>
  </div>
  <div class="form-group">
      <label for="username">Username</label>
      <input type="text" class="form-control" id="input-username-register" placeholder="Enter Username" name='username'>
  </div>
  <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" id="input-password-register" placeholder="Password" name='password'>
  </div>
  <div class="form-group">
      <label for="confirm-password">Confirm Password</label>
      <input type="password" class="form-control" id="input-confirm-password-register" placeholder="Confirm Password" name='confirm'>
  </div>
  <div class="form-group">
      <button type="button" class="btn btn-primary" role="button" onclick="registerProcessClient()">Register</button>
  </div>
</form>
</div>
`
    $('#main-container').prepend(html)

}

function registerProcessClient() {
    $('#alert-confirm').remove()
    let $email = $('#input-email-register').val()
    let $username = $('#input-username-register').val()
    let $password = $('#input-password-register').val()
    let $confirm = $('#input-confirm-password-register').val()
    if ($password != $confirm) {
        let html = ''
        html += `
          <div class="alert alert-danger" role="alert" id='alert-confirm'>
            <strong>Confirm Password Not Match</strong> Please Try Again
          </div>
        `
        $('#form-register').append(html)
    } else {
        $.ajax({
            url: "http://localhost:3000/api/user/register",
            method: "post",
            data: {
                email: $email,
                username: $username,
                password: $password
            },
            success: function(data) {
                Auth.authenticateUser(data)
                console.log(Auth.getToken());
                $('#main-container').empty()
                let html = ''
                html += `
              <div class="jumbotron">
              <h1>Welcome ${Auth.getUser().username}</h1>
              </div>

              `
                $('#main-container').append(html)
                $('#nav-logout').show()
                $('#nav-logout').on('click', processLogout)

                let homepanel = `
                <li id='nav-home'><a href="#">Home</a></li>
                <li id="nav-create"><a href="#">Data</a></li>
                <li id="nav-register"><a href="#">Data Date</a></li>
                `
                $('#navbar-ul-left').append(homepanel)
            },
            error: function(err) {
                console.log('failed');
                formRegister()
                $('#nav-home').hide()
                $('#nav-create').hide()
                $('#nav-search').hide()
                $('#nav-logout').hide()
            }
        })
    }
}

function formLogin() {
    $('#main-container').empty()
    html = ''
    html += `
<div class="jumbotron">
<ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link active" href="#" onclick='formRegister()'>Register</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#" onclick='formLogin()'>Login</a>
  </li>
</ul>
<h1 class="text-center">Login</h1>
<form id="form-login">
    <div class="form-group">
        <label for="username">Email</label>
        <input type="text" class="form-control" id="input-username-login" placeholder="Enter Username" name='username'>
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="input-password-login" placeholder="Password" name='password'>
    </div>
    <div class="form-group">
        <button type="button" class="btn btn-primary" role="button" onclick="loginProcessClient()">Login</button>
    </div>
</form>
</div>
`
    $('#main-container').prepend(html)

}

function loginProcessClient() {
    let $email = $('#input-email-login').val()
    let $password = $('#input-password-login').val()

    $.ajax({
        url: "http://localhost:3000/api/user/login",
        method: 'post',
        data: {
            email: $email,
            password: $password
        },
        success: function(data) {
            $('#main-container').empty()
            Auth.authenticateUser(data)
            console.log(Auth.getUser());
            let html = ''
            html += `
          <div class="jumbotron">
          <h1>Welcome ${Auth.getUser().username}</h1>
          </div>

          `
            $('#main-container').append(html)
            $('#nav-login').hide()
            $('#nav-register').hide()
            $('#nav-logout').show()
            $('#nav-logout').on('click', processLogout)
            let homepanel = `
            <li id='nav-home'><a href="#">Home</a></li>
            <li id="nav-create"><a href="#">Data</a></li>
            <li id="nav-register"><a href="#">Data Date</a></li>
            `
            $('#navbar-ul-left').append(homepanel)

        },
        error: function(err) {
            formRegister()
            $('#nav-register').on('click', formRegister)
            $('#nav-login').on('click', formLogin)
            $('#nav-home').hide()
            $('#nav-create').hide()
            $('#nav-search').hide()
            $('#nav-logout').hide()
        }
    })

}

function processLogout() {
    localStorage.removeItem('token')
    authPage()
}

function authPage() {
    $('#nav-logout').hide()
    formRegister()
}

function loadData() {

}
