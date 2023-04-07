export const goCommentsPage = (navigate, postId) => {
    navigate(`/post/${postId}/comment`);
}

export const goSignupPage = (navigate) => {
    navigate("/signup")
}

export const goLoginPage = (navigate) => {
    navigate("/login")
}

export const goPostsPage = (navigate) => {
    navigate("/post")
}

export const goHomePage = (navigate) => {
    navigate("/")
}