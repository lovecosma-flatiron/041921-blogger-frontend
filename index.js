const getForm = () => document.getElementById("form")
const blogContainer = () => document.querySelector(".blog-container")
const titleInput = () => document.getElementById("title")
const contentInput = () => document.getElementById("content")

const removeAllChildren = (parent) => {
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}   

function deletePost(e){
    let configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
    fetch(`http://localhost:3000/posts/${this.id}`, configObj)
    .then(resp => resp.json())
    .then(postsData => renderPosts(postsData))


}

function likePost(e){
    let params = {
        post: {
            likes: this.likes += 1
        }
    }
    
    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(params)
    }
    fetch(`http://localhost:3000/posts/${this.id}`, configObj)
    .then(resp => resp.json())
    .then(postsData => renderPosts(postsData))
}

const renderPosts = posts => {

    removeAllChildren(blogContainer())

    posts.forEach(post => {

        let div = document.createElement("div")
        let title = document.createElement("h3")
        let content = document.createElement("p")
        let likes = document.createElement("p")
        let br = document.createElement("br")
        let likeButton = document.createElement("button")
        let del = document.createElement("button")

        title.innerText = post.title
        content.innerText = post.content
        // debugger
        likes.innerText = post.likes
        likeButton.innerText = "♥"
        del.innerText = "delete this post"
        del.addEventListener("click", deletePost.bind(post))
        likeButton.addEventListener("click", likePost.bind(post))
        div.id = `post ${post.id}`
        div.className = "card"
        div.style.padding = "40px"

        blogContainer().style.padding = "25px"
        div.appendChild(title)
        div.appendChild(content)
        div.appendChild(likes)
        div.appendChild(likeButton)
        div.appendChild(del)
        blogContainer().appendChild(div)
        blogContainer().appendChild(br)
    })
    // debugger
}


const fetchPosts = () => {
    fetch("http://localhost:3000/posts")
    .then(resp => resp.json())
    .then(postsData => renderPosts(postsData))
}


const submitForm = e => {
    e.preventDefault();
    let params = {
        post: {
            title: titleInput().value,
            content: contentInput().value
        }
    }

    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(params)
    }

    fetch("http://localhost:3000/posts", configObj)
    .then(resp => resp.json())
    .then(postsData => renderPosts(postsData))
}


const startProgram = () => {
    getForm().addEventListener("submit", submitForm)
    fetchPosts()
}


document.addEventListener("DOMContentLoaded", startProgram)