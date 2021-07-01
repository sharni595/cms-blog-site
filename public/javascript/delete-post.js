async function deleteForm(event){
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];


    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });

    if(response.ok){
        document.location.replace('/dashboard');
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#delete-btn').addEventListener('click', deleteForm);