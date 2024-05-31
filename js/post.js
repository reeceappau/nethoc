const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get('slug');;


let post;

fetchPostBySlug(slug)
    .then(data => {
        post = data;
        console.log(post);
        populate(post);
    })
    .catch(error => {
        console.error('An error occured: ', error);
        post = -1;
    })

if (post == -1){
    console.log("Post not found")
}

function populate(post) {
    const postFields = post.items[0].fields;
    const coverImageId = postFields.coverImage.sys.id;
    const coverImageUrl = post.includes.Asset.find(asset => asset.sys.id === coverImageId).fields.file.url;
    const author = post.includes.Entry.find(entry => entry.sys.id === postFields.author.sys.id).fields;
    const authorName = author.name;
    const authorAvatarId = author.avatar.sys.id;
    const authorAvatarUrl = post.includes.Asset.find(asset => asset.sys.id === authorAvatarId).fields.file.url;

    
    const heading = document.getElementById('title');
    heading.textContent = postFields.title;

    const summary = document.getElementById('summary');
    summary.textContent = postFields.summary;

    // post meta (add date posted)
    const meta = document.getElementById('meta');
    meta.innerHTML = ` <img class="rounded-circle" src="https://${authorAvatarUrl}" width=25 /> by <i>${authorName}</i> on <i>${postFields.created.substring(0, 10)}</i>`;

    const cover = document.getElementById('cover');
    cover.innerHTML = `<img class="mb-5 img-fluid" src="https://${coverImageUrl}" alt="" />`;

    const content = document.getElementById('content');;
    content.innerHTML = markdown(postFields.content);
}


