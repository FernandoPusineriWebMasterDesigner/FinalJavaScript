window.onload = function () {
    var isAuthenticated = checkAuthentication();
    if (!isAuthenticated || localStorage.getItem('loginSuccess') === 'true') {
        showRegistrationModal();
    } else {
        showRegistrationModal();  
    }
};

function checkAuthentication() {
    var userData = JSON.parse(localStorage.getItem("userData"));
    return !!userData;
}


function showRegistrationModal() {
    Swal.fire({
        title: 'Registro',
        html: 'Antes de acceder a la página, por favor regístrate.<br><br>' +
            '<button id="loginBtn" class="swal2-confirm swal2-styled" onclick="showLoginForm()">Acceder</button>' +
            '<a href="#" id="registerLink" onclick="showRegistrationForm()">Registrarse</a>',
        showCancelButton: false,
        showCloseButton: false,
        showConfirmButton: false,
        allowOutsideClick: false
    });
}


function showRegistrationForm() {
    Swal.fire({
        title: 'Registro',
        html: '<input type="text" id="fullname" placeholder="Nombre completo" required><br>' +
            '<input type="text" id="username" placeholder="Nombre de usuario" required><br>' +
            '<input type="password" id="password" placeholder="Contraseña" required><br>' +
            '<input type="password" id="confirmPassword" placeholder="Confirmar contraseña" required><br>' +
            '<button id="registerBtn" onclick="registerUser()">Registrarse</button>',
        showCancelButton: true,
        showCloseButton: true,
        showConfirmButton: false,
        allowOutsideClick: false
    }).then((result) => {
        if (result.isDismissed) {
            showRegistrationModal();
        }
    });
}



function registerUser() {
    var fullname = document.getElementById('fullname').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    var existingUserDataString = localStorage.getItem("userData");
    if (existingUserDataString) {
        var existingUserData = JSON.parse(existingUserDataString);
        if (existingUserData.username === username) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El nombre de usuario ya está registrado'
            }).then(() => {
                showRegistrationModal();
            });
            return;
        }
    }

    if (password !== confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Las contraseñas no coinciden'
        }).then(() => {
            showRegistrationModal();
        });
        return;
    }

    var userData = {
        fullname: fullname,
        username: username,
        password: password
    };
    localStorage.setItem("userData", JSON.stringify(userData));

    Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: '¡Ahora puedes acceder al contenido!',
        onClose: function () {
            window.location.reload();
        }
    });
}



function checkAuthentication() {
    var userDataString = localStorage.getItem("userData");
    return userDataString !== null && userDataString !== undefined;
}

    
    function checkAuthentication() {
        var userDataString = localStorage.getItem("userData");
        return userDataString !== null && userDataString !== undefined;
    }

function showLoginForm() {
    Swal.fire({
        title: 'Inicio de Sesión',
        html: '<input type="text" id="loginUsername" placeholder="Nombre de usuario" required><br>' +
            '<input type="password" id="loginPassword" placeholder="Contraseña" required><br>' +
            '<button id="loginBtn" onclick="login()">Iniciar Sesión</button>',
        showCancelButton: true,
        showCloseButton: true,
        showConfirmButton: false,
        allowOutsideClick: false
    }).then((result) => {
        if (result.isDismissed) {

            showRegistrationModal();
        }
    });
}

function login() {
    var username = document.getElementById('loginUsername').value;
    var password = document.getElementById('loginPassword').value;

    var userDataString = localStorage.getItem("userData");
    if (!userDataString) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No hay usuarios registrados'
        }).then(() => {
            showRegistrationModal();
        });
        return;
    }

    var userData = JSON.parse(userDataString);
    if (userData.username === username && userData.password === password) {
        localStorage.setItem('loginSuccess', true);

        Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: '¡Bienvenido de nuevo!'
        }).then(() => {
            history.replaceState({}, '', index.html);
            window.location.href = index.html;
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Nombre de usuario o contraseña incorrectos'
        }).then(() => {
            showLoginForm();
        });
    }
}


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("logoutBtn").addEventListener("click", function() {
        showRegistrationModal();
    });
});

