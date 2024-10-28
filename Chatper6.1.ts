class Website {
  constructor(private url: string) {}
  getUrl() {
    return this.url;
  }
  generateLink(name: string, id: string) {
    return this.url + name + id;
  }
}

class User {
  constructor(private username: string) {}
  getUsername() {
    return this.username;
  }
  generateLink(website: Website, id: string) {
    website.generateLink(this.username, id);
  }
}

class BlogPost {
  constructor(private author: User, private id: string) {}
  getId() {
    return this.id;
  }
  getAuthor() {
    return this.author;
  }

  generateLink(website: Website) {
    return this.author.generateLink(website, this.id);
  }
}

function generatePostLink(website: Website, post: BlogPost) {
  //   let url = website.getUrl();
  //   let user = post.getAuthor();
  //   let name = user.getUsername();
  //   let postId = post.getId();
  //   return url + name + postId;
  return post.generateLink(website);
}
