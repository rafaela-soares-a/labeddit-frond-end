import { useContext } from "react";
import { NavbarStyled, Logo, Close, LogoutLink, LoginLink } from "./NavbarStyled";
import { useNavigate } from "react-router-dom";
import {   goToLoginPage,   goToPostsPage,} from "../../routes/coordinator";
import { GlobalContext } from "../../contexts/globalcontext";

export default function Header() {
  const { context, page, setPage } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("labeddit-token");
    context.setIsAuth(false);
    goToLoginPage(navigate);
  }

  const handleClose = () => {
    goToPostsPage(navigate);
    setPage("");
  }

  return (
    <HeaderStyled>
      <div>
        {page === "commentPage" && <Close src={require("../../assets/x.svg").default} alt="close" onClick={handleClose} />}
        <Logo src={require("../../assets/logo.svg").default} alt="logo" />
        {context.isAuth
          ? <LogoutLink onClick={handleLogout}>Logout</LogoutLink>
          : <LoginLink onClick={() => goToLoginPage(navigate)}>Entrar</LoginLink>
        }
      </div>
    </HeaderStyled>
  );
}
