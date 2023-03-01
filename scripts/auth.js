class User {
  constructor() {}
  #checkUsername(username) {
    return username.includes("#") ? false : true;
  }
  #checkPassword(password) {
    return password.length > 8 ? true : false;
  }

  async Signup(n, e, u, p, m, d) {
    let isValidated = this.#checkUsername(u) && this.#checkPassword(p);
    //if the user is validated, then store data in es6 class object.
    if (isValidated) {
      this.name = n;
      this.email = e;
      this.username = u;
      this.password = p;
      this.mobile = m;
      this.description = d;

      let actual_data = JSON.stringify(this);
      try {
        let res = await fetch(
          "https://masai-api-mocker.herokuapp.com/auth/register",
          {
            method: "POST",

            body: actual_data,

            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        let data = await res.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
  }
  async Login(u, p) {
    this.login_username = u;
    this.login_password = p;

    let actualData = JSON.stringify(this);

    console.log("actual_data", actualData);

    const login_url = `https://masai-api-mocker.herokuapp.com/auth/login`;

    let result = await fetch(login_url, {
      method: "POST",

      body: actualData,

      headers: {
        "Content-Type": "application/json",
      },
    });

    let data1 = await result.json();
    console.log(data1);
  }
}

let u1 = new User();

function Register() {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const mobile = document.getElementById("mobile").value;
  const description = document.getElementById("description").value;

  u1.Signup(name, email, username, password, mobile, description);
}
console.log(u1);

function logIn() {
  const login_username = document.getElementById("login_username").value;
  const login_password = document.getElementById("login_password").value;

  u1.Login(login_username, login_password);

  alert("Login Successful");
  document.location.href = "index.html";
}
