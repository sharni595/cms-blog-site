async function editPostHandler(event){
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const contents = document.querySelector('input[name="post-contents"]').value.trim();

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT', 
        body: JSON.stringify({
            title, 
            contents
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok){
        document.location.replace('/dashboard');
    } else{
        console.log(title);
        console.log(contents);
        alert(response.statusText);
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', editPostHandler);