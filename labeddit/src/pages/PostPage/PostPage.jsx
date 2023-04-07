import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/url";
import { goToLoginPage } from "../../routes/coordinator";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Post from "../../components/Post/Post";
import { PostsPageStyled } from "./PostsPageStyled";
import { GlobalContext } from "../../contexts/globalcontext";

export default function PostsPage() {

    const { context, posts, setPosts, fetchPosts } = useContext(GlobalContext);
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState("PostsPage");
    const navigate = useNavigate();

    useEffect(() => {
        const token = window.localStorage.getItem("labeddit-token");
        if (!token) {
            goToLoginPage(navigate);
        }
        context.setIsAuth(true);
    }, [context, navigate]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const createPost = async () => {
        setIsLoading(true);
        try {
            const body = { content };
            const config = {
                headers: {
                    Authorization: window.localStorage.getItem("labeddit-token"),
                },
            };
            const response = await axios.post(`
                ${BASE_URL} / posts / create,
                body,
                config`
            );
            setPosts(response.data);
            fetchPosts();
            setContent("");
        } catch (error) {
            console.log(error?.response?.data);
            window.alert(error?.response?.data);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <PostsPageStyled>
                <section className="container-input">
                    <div className="input">
                        <input
                            type="text"
                            placeholder="Escreva seu post..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                    <button type="submit" onClick={createPost} disabled={isLoading}>
                        {isLoading ? <div className="loading"></div> : "Postar"}
                    </button>
                </section>
                <hr />
                <section className="container-posts">
                    {Array.isArray(posts) &&
                        posts
                            .slice()
                            .reverse()
                            .map((post) => (
                                <Post key={post.id} post={post} />
                            ))}
                </section>
            </PostsPageStyled>
            <Footer page={page} />
        </>
    );
}