import { useContext } from "react";
import { GlobalContext } from "../../contexts/globalcontext";
import axios from "axios";
import { BASE_URL } from "../../contents/config";
import { PostStyled } from "./PostStyled";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png" 


export default function Comment ({Comment}) {
    const { createComment } = useContext(GlobalContext);

    const params = useParams()

    const likeComment = async (commentId) => {
        try {

            let body = {
                like: true,
            }

            await axios.put (`${BASE_URL}/post/comment/${commentId}/like`, body, {
                headers: {
                    Authorization: window.localStorage.getItem("token-labeddit"),
                },
            })

            createComment(params.id)
            
        } catch (error) {

            console.log(error?.response?.data);
            alert(error?.response?.data);
            
        }
    }

    return (
        <>

        <PostStyled >
            <section className="post-container">
                <h5>Comentário enviado por: {commnet.creatorName}</h5>
                <p>{comment.content}</p>

                <section className="post-icons">
                    <div>
                        <img src={like} alt="icone de like do comentário" onClick={() => likeComment(comment.id)}/>
                        <h5>{comment.like} </h5>
                        <img src= {dislike} alt="icone de dislike do comentário" onClick={() => dislikeComment(comment.id)}/>
                        <h5>{comment.dislike}</h5>
                    </div>
                </section>
            </section>
        </PostStyled>
        </>
    )
}