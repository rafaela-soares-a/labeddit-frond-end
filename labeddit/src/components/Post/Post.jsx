import axios from "axios";
import {useNavigate} from "react-router-dom";
import {GlobalContext} from "../../contexts/globalcontext"
import { useContext, useEffect, useState } from "react";
import {BASE_URL} from "../../contents/config";
import dislike from "../../assets/dislike.png";
import like from "../../assets/like.png";


export default function Post ({ post }) {
    const { createPost, setPost} = useContext(GlobalContext);
    const [comment, setComment] = useState([]);

    const navigate = useNavigate();

    const likepost = async (postId) => {
      try {
        let body = {
          like: true,
        }
        await axios.put (`${BASE_URL}/posts/${postId}/like`, body, {

          headers: {
            Authorization: window.localStorage.getItem("token-labeddit"),
          },

        })

        createPost()

      } catch (error) {
        console.log(error?.response?.data)
        alert(error?.response?.data)    
      }
    }

    const dislikePost = async (postId) => {
      try {
        let body = {
          like: false,
        }
        await axios.put(`${BASE_URL
        }/posts/${postId}/like`, body, {
          headers: {
            Authorization: window.localStorage.getItem("token-labeddit"),
          },
        }),
        fetchPosts()
      } catch (error) {
        console.log(error?.response?.data)
        alert(error?.response?.data)      
      }
    }
  
    const fetchComments = async (postId) => {
      try {
        const config = {
          headers: {
            Authorization: window.localStorage.getItem("token-labeddit"),
          },
        }
        const response = await axios.get(
          `${BASE_URL}/posts/comment/${postId}`,
          config
        )
        setComment(response.data)
      } catch (error) {
        console.log(error?.response?.data)
        alert(error?.response?.data)      
      }
    }
  
    useEffect(() => {
      fetchComments(post.id)
    }, [])

    return (
      <>
      <PostStyled>
          <section className="post-container">
              <h6>Enviado por: {post?.creator?.name?? "Anônimo"}</h6>
              <p>{post.content}</p>
          </section>
  
          <section className="post-icons">
  
              <div>
                  <img src={like} alt="icone de like" onClick={() => likePost(post.id)} />
                  <h5>{post.like}</h5>
  
                  <img src={dislike} alt="icone de dislike" onClick={() => dislikePost(post.id)} />
                  <h5>{post.dislike}</h5>
              </div>
              
              <div onClick={() => {
                  goToComment(navigate, post.id)
                  setPage("commentPage")
              }}>
  
                  <img src={commentPost} alt=""/>
                  <h5>{comment.length}</h5>
  
              </div>
  
          </section>
      </PostStyled>
      </>
    )
  
  
}
  
  
  