import { useCallback, useContext, useState } from "react";
import { SignupPageStyled } from "./SignupPageStyled";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/url";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { GlobalContext } from "../../contexts/globalcontext";
import { goTopostPage } from "../../router/coordinator";

export default function SignupPage() {
  const context = useContext(GlobalContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeForm = useCallback((event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }, []);

  const signup = useCallback(async () => {
    try {
      const { data: { token } } = await axios.post(
        `${BASE_URL}/user/signup`,
        form
      );

      window.localStorage.setItem("token-labeddit", token);
      context.context.setIsAuth(true);
      goTopostPage(navigate);
    } catch (error) {
      console.log(error?.response?.data);
      alert(error?.response?.data);
    }
  }, [context.context, form, navigate]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      signup();
    },
    [signup]
  );

  return (
    <>
      <Navbar />
      <SignupPagetyled>
        <section>
          <h1>Olá, boas vindas ao LabEddit</h1>
        </section>
        <section className="container-inputs">
          <input
            type="text"
            placeholder="Nome"
            name="name"
            value={form.name}
            onChange={onChangeForm}
          />
          <input
            type="email"
            placeholder="E-mail"
            name="email"
            value={form.email}
            onChange={onChangeForm}
          />
          <input
            type="password"
            placeholder="Senha"
            name="password"
            value={form.password}
            onChange={onChangeForm}
          />
        </section>
        <section>
          <section>
            <h6>
              Ao continuar você concorda com o nosso <a>Contrato de usuário</a>{" "}
              e nossa <a>Política de Privacidade</a>
            </h6>
            <section className="container">
              <input type="checkbox" name="" id="termo" />
              <label htmlFor="termo">
                <h6>
                  Eu concordo em receber emails sobre coisas legais no LabEddit
                </h6>
              </label>
            </section>
          </section>
          <button className="button-color" onClick={signup}>
            Cadastrar
          </button>
        </section>
      </SignupPagetyled>
      <Footer/>
    </>
  );
}