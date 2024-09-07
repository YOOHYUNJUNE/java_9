import { useTheme } from "@emotion/react";
import { Avatar, Card, CardHeader, CardMedia, CardContent, Typography, IconButton } from "@mui/material"; 
import { useNavigate } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";

const PostCard = ( { post }) => {
    const navigate = useNavigate();
    const theme = useTheme();

    // const handleDownload = (e) => {
    //     e.stopPropagation();
    //     window.location.href = `${process.env.REACT_APP_REST_SERVER}/post/download/${post.image.id}`
    // }

    return (
        <Card 
            sx={{ 
                maxWidth: 500, maxHeight: 600, cursor: 'pointer',
                transition:'transform 0.2s', '&:hover':{transform:'scale(1.05)'}
            }} 
            onClick={() => navigate(`/post/${post.id}`)}>
            <CardHeader
                avatar={<Avatar>{post.id}</Avatar>}
                title={post.title}
                subheader={post.createdAt}
                // // 이미지 첨부 여부를 아이콘으로 보여줌
                // action={post.image && 
                //     <IconButton>
                //         <SaveIcon onClick={(e) => handleDownload(e)} />
                //     </IconButton> }
            />
            {
                post.image &&
                <CardMedia
                component="img" height="194" alt="게시글 이미지"
                image={`${process.env.REACT_APP_SERVER}/img/${post.image.saved}`}                
                />
            }
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize:12 }}>
                    {post.author.name} - {post.author.email}
                </Typography>
                
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {post.content}
                </Typography>
            </CardContent>
        </Card>
    );
}
 
export default PostCard;