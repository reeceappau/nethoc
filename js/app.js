const spaceId = 'og4qngcq5vmd';
let accessToken = 'D2IfRWPS8cqOTdJFzHlS-AMKGhz5_-1hEslVKbSF6Pk';
const environmentId = 'master';
let contentTypeId = 'post';



function fetchPostBySlug(slug) {
    const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&content_type=${contentTypeId}&fields.slug=${slug}&include=3`;
    var post;
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.items.length > 0) {
                return data;
            }
        })
        .catch(error => console.error('Error fetching post:', error));

}

function fetchAllPost() {
    const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&content_type=${contentTypeId}&include=2`;

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Full data from Contentful:', data);
            return data;
        })
        .catch(error => console.error('Error fetching data:', error));
}