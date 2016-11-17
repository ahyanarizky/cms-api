$(document).ready(function() {
    if (!localStorage.getItem('token')) {
        authPage()
    } else {
        loadData()
    }
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
                <li id="nav-data"><a href="#">Data</a></li>
                <li id="nav-datadate"><a href="#">Data Date</a></li>
                `
                $('#navbar-ul-left').append(homepanel)
                $('#nav-data').on('click', loadData)
                $('#nav-datadate').on('click', loadDataDate)
            },
            error: function(err) {
                console.log('failed');
                formRegister()
                $('#nav-home').hide()
                $('#nav-data').hide()
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
            <li id="nav-data"><a href="#">Data</a></li>
            <li id="nav-register"><a href="#">Data Date</a></li>
            `
            $('#navbar-ul-left').append(homepanel)

        },
        error: function(err) {
            formRegister()
            $('#nav-register').on('click', formRegister)
            $('#nav-login').on('click', formLogin)
            $('#nav-home').hide()
            $('#nav-data').hide()
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
    $('#main-container').empty()

    $.ajax({
        url: `http://localhost:3000/api/data`,
        method: "get",
        success: function(data) {
            tableData = `
            <div class="container">
            <button type="button" class="btn btn-primary" onclick='formCreate()'><span class="glyphicon glyphicon-plus"></span>  add</button>
            <div id="form-create"></div>
            <div id="form-update"></div>
          <div class="container">
            <table class="table">
                <thead class="thead-inverse">
                    <tr>
                        <th>#</th>
                        <th>Letter</th>
                        <th>Frequency</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>`

            for (var i = 0; i < data.length; i++) {
                tableData += `
                      <tr>
                          <th scope="row">${i+1}</th>
                          <td>${data[i].letter}</td>
                          <td>${data[i].frequency}</td>
                          <td> <button type="button" class="btn btn-success" onclick='formUpdateData(${data[i].dataId})'> <span class="glyphicon glyphicon-edit"></span>  Update</button>     <span><button type="button" class="btn btn-danger" onclick='deleteData(${data[i].dataId})'> <span class="glyphicon glyphicon-trash"></span>  Delete</button></span>                   </td>
                      </tr> `
            }
            tableData += `
                </tbody>
            </table>
          </div>
        </div>
      `
            $('#main-container').append(tableData)
            $('#nav-data').on('click', loadData)
            $('#nav-datadate').on('click', loadDataDate)
            $('#nav-logout').on('click', processLogout)

        }
    })
}

function formCreate() {
    let form = `
<form class="form-inline">
    <div class="form-group">
      <label for="form-letter">Letter</label>
      <input type="text" class="form-control" id="form-letter" placeholder="Letter">
    </div>
    <div class="form-group">
      <label for="form-frequency">Frequency</label>
      <input type="text" class="form-control" id="form-frequency" placeholder="Frequency">
    </div>
    <button class="btn btn-primary" onclick="inputData()">Submit</button>
</form>
  `
    $('#form-create').append(form)
}

function inputData() {
    let $letter = $('#form-letter').val()
    let $frequency = $('#form-frequency').val()
    $.ajax({
        url: `http://localhost:3000/api/data`,
        method: "post",
        data: {
            letter: $letter,
            frequency: $frequency
        },
        success: function(data) {
            $('#main-container').empty()
            loadData()
        }
    })

}

function formUpdateData(parameter) {
    $('#form-create').empty()

    $.ajax({
        url: `http://localhost:3000/api/data/${parameter}`,
        method: "get",
        success: function(data) {
            let formupdate = ''
            formupdate += `
    <form class="form-inline">
        <div class="form-group">
          <label for="form-letter">Letter</label>
          <input type="text" class="form-control" id="form-letter-update" value='${data[0].letter}'>
        </div>
        <div class="form-group">
          <label for="form-frequency">Frequency</label>
          <input type="text" class="form-control" id="form-frequency-update" value='${data[0].frequency}' >
        </div>
        <button class="btn btn-primary" onclick="updateData(${data[0].dataId})">Update</button>
    </form>
    `
        }
    })

}

function updateData(parameter) {
    let $letter = $('#form-letter-update').val()
    let $frequency = $('#form-frequency-update').val()
    $.ajax({
        url: `http://localhost:3000/api/data/${parameter}`,
        method: "put",
        data: {
            letter: $letter,
            frequency: $frequency
        },
        success: function(data) {
            $('#main-container').empty()
            loadData()
        }
    })
}


function loadDataDate() {

}
