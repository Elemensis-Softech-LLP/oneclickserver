import callApi from '../../util/apiCaller';

// Export Constants
export const LOGIN_USER = 'LOGIN_USER';


// Export Actions
export function loginUser(post) {
  return {
    type: LOGIN_USER,
    post,
  };
}

export function loginUserRequest(post) {
  return (dispatch) => {
    return callApi('posts', 'post', {
      post: {
        name: post.name,
        title: post.title,
        content: post.content,
      },
    }).then(res => dispatch(loginUser(res.post)));
  };
}
