import { database } from '../firebase'
export const FETCH_POSTS = 'fetch_posts'

export function getPosts () {
  return dispatch => {
    database.on('value', snapshot => {
      dispatch({
        type: FETCH_POSTS,
        payload: snapshot.val()
      })
    })
  }
}

export function splitBill(id,post) {
  const afterCost = post.cost/post.quantityPerson
  return dispatch => afterCost
}

export function savePost(post) {
  return dispatch => database.push(post)
}

export function updatePost(id,post) {
  return dispatch => database.child(id).update(post);
}

export function deletePost(id) {
  return dispatch => database.child(id).remove();
}

