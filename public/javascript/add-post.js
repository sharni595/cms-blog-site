async function addPostHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const contents = document.querySelector('input[name="post-content"]').value;

    const response = await fetch('/api/posts', {
        method: 'post',
        body: JSON.stringify({
            title, 
            contents
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText);
    }
}

document.querySelector(".new-post").addEventListener("submit", addPostHandler);