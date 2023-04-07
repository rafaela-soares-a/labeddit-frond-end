import { useCallback, useEffect, useState } from "react";
import { BASE_URL } from "../contents/config";
import axios from "axios";

export default function GlobalState() {
    
    const [post, setPost] = useState([]);
    const [auth, setAuth] = useState(false);
    const [page, setPage] = useState("");
    const [comment, setComment] = useState([]);


    useEffect (() => {
        const token =  window.localStorage.getItem("token-labeddit")

        if (token) {
            setAuth(true)
        }
    })

    const contexts = {
        auth: auth,
        setAuth: setAuth
    };

    const createPost = useCallback (async ()=>{

        try {

            const postConfig = {
                Headers: {
                    Authorization: window.localStorage.getItem("token-labeddit"),
                },

            };

            const response = await axios.get (`${BASE_URL}/posts`, postConfig);
                setPost(response.data)
            
        } catch (error) {
            console.log(error?.response?.data);
            window.alert(error?.response?.data?.message);
            
        }

    });

    const createComment = useCallback (async (Id) => {

        try {
            const configCommnet = {
                Headers: {
                    Authorization: window.localStorage.getItem("token-labeddit"),
                },
            };

            const response = await axios.get(`${BASE_URL}/posts/commets/${Id}`, configCommnet);
            setComment(response.data)
            
        } catch (error) {

            console.log(error?.response?.data)            
        };

        return {
            contexts,
            createComment,
            createPost,
            post,
            setPost,
            createPost,
            comment,
            setComment,
            page,
            setPage
        }

    })
}