import React from "react";
import '@fortawesome/fontawesome-free/css/all.css';
import Header from "../header/Header";


function UserPanel() {

  
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user.username;
  const email = user.email;
  const roles = user.roles;
  
  return (
    <div class="">
      <Header></Header>
      <div className="row justify-content-center">
        <div className="col-10">
          <h2 className="mt-3">Heureux de vous revoir {username} !</h2>
          <div className="row justify-content-center mt-3">

            <div className="col-2">
              <div class="card bg-body-tertiary w-100 justify-content-center" style={{width: "18rem"}}>
                <div class="card-body">
                  <h5 class="card-title text-center">Mon compte</h5>
                  <div className="row justify-content-center">
                    <img src='/defaultimage_user.png' class="rounded float-start w-50"  alt="User image"></img>
                  </div>
                  <h6 className="text-center">{username}</h6>
                  <h6 className="text-center">{email}</h6>
                  <h6 className="text-center">{roles}</h6>
                  <div className="text-center justify-content-center">
                    <a href="#" class="btn btn-sm btn-secondary">Modifier</a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPanel;
