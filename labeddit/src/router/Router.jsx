import {BrowserRouter, Router, Routes} from "react-router-dom";
import CommentPage from "../pages/CommentPage/CommentPage";


export default function Router () {
    return (
        <BrowserRouter>
        <Routes>
            <Route path= "/post/${postId}/comment" element = {<CommentPage/>} />
            {/* <Route path = "/signup" element {<SignupPage/>} />
            <Route path = "/login" element {<LoginPage/>} />
            <Route path = "/post" element {<PostPage/>} />
            <Route path = "/" element {<HomePage/>}/> */}
        </Routes>
        </BrowserRouter>
    )
}