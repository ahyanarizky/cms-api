$(document).ready(function() {
    $('#nav-logout').hide()
    formRegister()
})

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
<form id="form-login">
  <div class="form-group">
      <label for="email">Email</label>
      <input type="email" class="form-control" id="input-email" placeholder="Enter Email" name='email'>
  </div>
  <div class="form-group">
      <label for="username">Username</label>
      <input type="text" class="form-control" id="input-username" placeholder="Enter Username" name='username'>
  </div>
  <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" id="input-password" placeholder="Password" name='password'>
  </div>
  <div class="form-group">
      <button type="button" class="btn btn-primary" role="button" onclick="registerProcessClient()">Register</button>
  </div>
</form>
</div>
`
    $('#main-container').prepend(html)

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
        <input type="text" class="form-control" id="input-username" placeholder="Enter Username" name='username'>
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="input-password" placeholder="Password" name='password'>
    </div>
    <div class="form-group">
        <label for="confirm-password">Confirm Password</label>
        <input type="password" class="form-control" id="input-confirm-password" placeholder="Confirm Password" name='confirm'>
    </div>
    <div class="form-group">
        <button type="button" class="btn btn-primary" role="button" onclick="loginProcessClient()">Login</button>
    </div>
</form>
</div>
`
    $('#main-container').prepend(html)

}
