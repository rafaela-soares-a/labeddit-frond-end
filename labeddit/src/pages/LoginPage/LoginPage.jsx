import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../contexts/globalcontext";
import { useNavigate } from "react-router-dom";
import {goToHomePage, goToSignupPage, goTopostPage  } from "../../router/Coordinator"
import { BASE_URL } from "../../contents/config";
import logo from "../../assets/logo.png"

export default function LoginPage() {
    const { context, setPage } = useContext(GlobalContext)
    const { isLoading, setIsLoading } = useState(false)

    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const onChangeForm = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        const token = window.localStorage.getItem("token-labeddit")
        if (token) {
            goTopostPage(navigate)
        }
    }, [])

    const login = async () => {
        try {
            setIsLoading(true);

            const body = {
                email: form.email,
                password: form.password,
            }

            const response = await axios.post(`${BASE_URL}/user/login`, body)

            window.localStorage.setItem("token-labeddit", response.data.token)
            const token = window.localStorage.getItem("token-labeddit")
            if (response.data.token === undefined) {
                window.localStorage.removeItem("token-labeddit")
                goToHomePage(navigate)
            }

            context.setIsAuth(true)

            goTopostPage(navigate, token)

        } catch (error) {
            console.log(error?.response?.data)
            alert(error?.response?.data)
            window.localStorage.removeItem("labeddit-token")
        } finally {
            setIsLoading(false)
        }
    };
    return (
        <>
          <LoginPageStyled>
            <section>
              <img src={logo} alt="" />
              <h1>LabEddit</h1>
              <h5>O projeto de rede social da Labenu</h5>
            </section>
            <section>
              <input
                type="email"
                value={form.email}
                onChange={onChangeForm}
                name="email"
                placeholder="E-mail"
                autoComplete="off"
              />
              <input
                type="password"
                value={form.password}
                onChange={onChangeForm}
                name="password"
                placeholder="Senha"
                autoComplete="off"
              />
            </section>
            <section>
              <button className="button-color" onClick={login} disabled={isLoading}>
              {isLoading ? <div className="loading"></div> : "Continuar"}
              </button>
              <hr />
              <button
                onClick={() => {
                  goToSignupPage(navigate);
                  setPage("signupPage");
                }}
              >
                Crie uma conta!
              </button>
            </section>
            <Footer />
          </LoginPageStyled>
        </>
      );
    }