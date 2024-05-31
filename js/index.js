fetchAllPost()
.then(data => {
    console.log(data);
    populate(data)
})
.catch(error => {
    console.error('An error occured: ', error);
    post = -1;
})

function populate(data) {
    const posts = data.items;

    const container = document.getElementById('posts-container');

    posts.forEach(post => {
        const author = data.includes.Entry.find(entry => entry.sys.id === post.fields.author.sys.id).fields;
        const authorName = author.name;
        const coverImageId = post.fields.coverImage.sys.id;
        const coverImageUrl = data.includes.Asset.find(asset => asset.sys.id === coverImageId).fields.file.url;

        container.innerHTML += `
        <div class="mb-5">
            
            <div class="card pt-4 px-4 border-0 rounded shadow-sm">
            <img src="https://${coverImageUrl}" class="card-img-top rounded" alt="...">
            <div class="card-body">
              <h2  class="card-title h4"><a class="text-decoration-none text-dark" href="post.html?slug=${post.fields.slug}">${post.fields.title}</a></h2>
              <p class="card-text fs-6 fw-light">${post.fields.summary}</p>
              <p class="text-muted fs-6 fw-lighter">${post.fields.created.substring(0, 10)} . ${authorName} </p>
              </div>
            </div>
          </div>
        `;
        
    });
}



