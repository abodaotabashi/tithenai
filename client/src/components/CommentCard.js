import React from 'react';
import { Avatar, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { formatFirebaseDateAndTime } from '../utils/HelperFunctions';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const CommentCard = (props) => {
    const { comment, handleDeleteComment, isOwn } = props;
    return (
        <Grid container alignItems="center" style={{borderRadius: "8px", border: '1px solid #14325A', padding: "1vh 1rem", margin: "1.5vh 0"}}>
            <Grid item xs={12} sm={12} md={12} lg={12} container justifyContent="space-between" style={{borderBottomRightRadius: "8px", borderBottomLeftRadius: "8px", borderBottom: '1px solid #14325A80'}}>
                <Grid item>
                    <div style={{display: 'flex', flexDirection: "row", alignItems: "center"}}>
                        <Avatar
                            variant="circular"
                            alt="commentarPhoto"
                            style={{width: "3rem", height:"3rem" ,margin: ".3rem"}}
                            src={comment.commenterImageURL}
                        />
                        <Typography variant="subtitle1" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700"}}>
                            &nbsp; {comment.commentAuthorName}
                        </Typography>
                    </div>
                </Grid>
                { isOwn === true &&
                    <Grid item style={{display: 'flex', alignItems: "center"}}>
                        <Tooltip title="Delete Comment" placement="bottom" arrow leaveDelay={100}>
                            <IconButton color="error" size="small" onClick={() => handleDeleteComment(comment.commentId)}>
                                <DeleteForeverIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                }
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="caption" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700"}}>
                    &nbsp; {formatFirebaseDateAndTime(comment.commentDate)}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="body2" component="div" style={{fontFamily: "Ubuntu", fontWeight: "700"}}>
                    &nbsp; {comment.commentBody}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default CommentCard