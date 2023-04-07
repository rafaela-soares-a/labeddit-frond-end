import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../contexts/globalcontext";

export function CommentPage() {
    const { context, createPost, post, createComment, comment, setComment} = useContext(GlobalContext)

    const [content, setContent] = useState("")
    const [isLoading, setIsloading] = useState(false)
    const [page, setPage] = useState("CommentPage")

    const navigate = useNavigate()
    const params = useParams()

    useEffect (() => {
        const token = window.localStorage.getItem("token-labeddit")

        if (token) {
            context.setIsAuth(true);
        } else {
          goToLoginPage(navigate);
        }
      }, [context]);

      useEffect(() => {
        createPost()
      }, [])

      const posts= post.find((post) => post.id === params.id)

      useEffect(() => {
        createComment(params.id)
      },[comment])

      const createComments = async (postId) => {
        try {
            setIsLoading(true)
      
            const body = {
              content: content,
            };
            const config = {
              headers: {
                Authorization: window.localStorage.getItem("token-labeddit"),
              },
            };
            const response = await axios.post(`${BASE_URL}/posts/comment/${postId}`, body, config )
            setComment(response.data)
            createComments(params.id)
            setContent("")

          } catch (error) {
            console.log(error?.response?.data)
            window.alert(error?.response?.data)
          } finally {
            setIsloading(false);
          }
        };
      
        return (
          <>
            <Navbar/>
            <PostsPageStyled>
              <section className="container-input">
                <Post post={posts}/>
                <div className="input">
                  <input
                    type="text"
                    placeholder="Escreva seu comentário..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <button type="submit" onClick={() => createsComment(params.id)} disabled={isLoading}>
                {isLoading ? <div className="loading"></div> : "Responder"}
                </button>
              </section>
              <hr />
              <section className="container-posts">
                {Array.isArray(comments) && comments
                  .map((comment) => {
                    return <Comment key={comment.id} comment={comment} />;
                  })}
              </section>
            </PostsPageStyled>
            <Footer page={page} />
          </>
        )
      }

      export default CommentPage;
      