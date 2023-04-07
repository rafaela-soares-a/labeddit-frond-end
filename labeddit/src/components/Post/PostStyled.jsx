import styled from "styled-components";

export const PostStyled = styled.div`
    display: flex;
    flex-direction: column; 
    justify-content: space-between;
    background-color: #fbfbfb;
    border: 1px solid #e0e0e0;
    border-radius: 13px;
    padding: 11px;
    width: 22rem

    .post-container {

        p{ font-size: 1.5rem;
            font-weight: 355;}
        h5 {
            margin-bottom: 20px;
            color: #6f6f6f;
        }
    }

    .post-icons{
        display: flex;
        width: 100%;
        margin-top: 15px;
    
    div {
      display: flex;
      align-items: center;
      margin-right: 15px;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 8px;
      h5 {
        margin: 0 5px;
        font-weight: 600;
        color: #6f6f6f;
        font-size: 0.598rem;
      }
    }
    }
`