export const goToCommentPage = (navigate, postId) => {
    navigate(`/post/${postId}/comment`);
}

export const goToSignupPage = (navigate) => {
    navigate("/signup")
}

export const goToLoginPage = (navigate) => {
    navigate("/login")
}

export const goTopostPage = (navigate) => {
    navigate("/post")
}

export const goToHomePage = (navigate) => {
    navigate("/")
}