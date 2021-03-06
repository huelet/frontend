import type { NextPage } from "next";
import { SetStateAction, useState } from "react";
import styles from "../../styles/Signup.module.css";
import { useCookies } from "react-cookie";
import { Card } from "../../components/card";

const AuthIn: NextPage = () => {
  const [resp, setResp] = useState<string>("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [JWTcookie, setJWTCookie] = useCookies(["_hltoken"]);
  const handleUsernameChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const resp = await fetch("https://api.huelet.net/auth/in", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await resp.json();
      console.log(data);
      if (resp.status === 401) {
        setResp("Invalid username or password");
      }
      if (resp.status === 200) {
        setJWTCookie("_hltoken", data.token, {
          path: "/",
        });
        location.assign("/explore");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div id="klausen">
      <Card title="Sign in" full={true}>
        <form id="form" onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            id="username"
            type="div"
            name="username"
            placeholder="Username"
            onChange={handleUsernameChange}
            value={username}
          />
          <div className="spacer-sm"></div>
          <div className="pwd-input flex">
            <input
              className={styles.input}
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handlePasswordChange}
              value={password}
            />
            <div className="spacer-sm"></div>
          </div>
          <div className="spacer"></div>
          <button className={"button-primary"} id="submit" type="submit">
            Sign In
          </button>
          <div className={"error-box sp-1-io"}>
            <p className="error-text">{resp}</p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AuthIn;
