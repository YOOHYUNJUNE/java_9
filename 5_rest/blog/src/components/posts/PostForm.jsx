import { Button, Grid2, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { postAPI } from "../../api/services/post";

const PostForm = () => {

    // react-hook-form
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();

    // 경로 이동
    const navigate = useNavigate();

    // postId가 없으면 작성, 있으면 수정
    const { postId } = useParams();
    // 게시물 수정
    const getPost = async () => {
        try {
            const res = await postAPI.getPost(postId);
            const data = res.data;
            console.log(data);
            // PostDetail은 setPost(state가 바뀔때)마다 실행되기때문에 무한 반복
            // -> useEffect() 사용
            setValue("title", data.title);
            setValue("content", data.content);
            
        } catch (error) {
            navigate("/error", {state:error.message})
        }
    }
    useEffect(() => {
        // postId가 있으면 게시물 정보 가져오기(수정)
        if (postId) {
            getPost();
        }
    }, []);

    const onSubmit = async (data) => {

        // 이미지 등록시 필요한 데이터 가져오기
        data.image = data.image[0];

        data.authorId = 1; // 로그인 기능 전까지 임의로 지정

        // 첨부파일은 JSON이 안되므로 Form으로 변환
        const formData = new FormData();
        
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]); // (title, data.title)
        })


        try {
            if (postId) {
                formData.append("id", postId);
                // 서버에 요청
                // 수정
                const res = await postAPI.modifyPost(formData);
            } else {
                // 추가
                const res = await postAPI.writePost(formData);
            }
            // 정상이면 게시글 목록으로 이동
            navigate("/post");
        } catch (error) {
            // 비정상이면 에러페이지로
            navigate("/error", {state:error.message})
        }

    }
    // watch("name") : 입력된 "name"값을 가져옴
    // console.log(watch("name"))


    return (
        <>
        { /* handleSubmit : onSubmit 동작 전 입력값 유효 검증 */ }
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* ...register("이름") 값 전달. 필수값, 유효성 검증 등을 추가할 수 있음 */}
            <Grid2 container direction={"column"} spacing={3} sx={{width: {xs:'250px', sm:'500px'}}}>
                {/* 제목(필수, 50자 이하) */}
                    <TextField 
                        variant="outlined" 
                        label="제목" 
                        error={errors.title && true} 
                        helperText={errors.title && "제목입력은 필수이며, 50자 이내로 작성해주세요."}
                        {...register("title", {required:true, maxLength:50})}
                    />

                {/* 내용(필수, 제한없음) */}
                    <TextField
                        label="내용"
                        multiline
                        rows={4}
                        error={errors.content && true}
                        helperText={errors.content && "내용은 필수입력입니다."}
                        {...register("content", {required:true})}
                    />

                {/* 이미지 등록 (선택) */}
                    <TextField 
                        type="file"
                        label="이미지 파일"
                        {...register("image", {required:false})}
                        slotProps={{ htmlInput: {"accept": "image/*"}}}
                    />

                {/* 비밀번호(필수, 영어+숫자 8자리 이상) */}
                    <TextField
                        id="outlined-password-input"
                        label="비밀번호"
                        error={errors.password && true}
                        helperText={errors.password && "영어와 숫자를 포함해 8자 이상 20자 이하로 생성해주세요."}
                        {...register("password", {required:true})}
                    />
            <div style={{ textAlign: 'right'}}>
                <Button type="submit" variant="outlined" color="primary">제출</Button>
            </div>
                
            </Grid2>


        </form>
        </>
    );
}
 
export default PostForm;