import { FacebookOutlined, GoogleOutlined,} from "@ant-design/icons";
import React from "react";
import "firebase/app";

import { auth } from "../firebase";
import firebase from "firebase/app";

export default function Login() {
  return (
    <div id="login-page">
      <div id="login-card">
        <h2> Welcome to UNichat </h2>

        <div className="login-button google" onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}>
        <GoogleOutlined /> Sign in With Google
        </div>
        <br />
        <br />
        
        <div className="login-button facebook">
        <FacebookOutlined /> Sign in With facebook
        </div>
      </div>
    </div>
  );
}