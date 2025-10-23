function fetchData(url, onSuccess, onError) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "json";

  xhr.onload = function () {
    if (xhr.status === 200) {
      onSuccess(xhr.response);
    } else {
      onError(`Ошибка загрузки: ${xhr.status}`);
    }
  };

  xhr.onerror = function () {
    onError("Ошибка соединения с сервером");
  };

  xhr.send();
}
fetchData(
  "https://jsonplaceholder.typicode.com/posts",
  function (posts) {
    const sortedPosts = posts.sort((a, b) => b.title.length - a.title.length);

    console.log("Посты, отсортированные по длине заголовка (по убыванию):");
    console.table(sortedPosts.slice(0, 5)); 
  },
  function (error) {
    console.error("Ошибка при загрузке постов:", error);
  }
);
fetchData(
  "https://jsonplaceholder.typicode.com/comments",
  function (comments) {
    const sortedComments = comments.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    console.log("Комментарии, отсортированные по имени автора:");
    console.table(sortedComments.slice(0, 5)); 
  },
  function (error) {
    console.error("Ошибка при загрузке комментариев:", error);
  }
);

const baseUrl = 'https://jsonplaceholder.typicode.com';
fetch(baseUrl + '/users')
  .then(response => response.json())
  .then(users => {
    const shortUsers = users.map(user => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone
    }));
    console.log('Пользователи (только нужные поля):');
    console.table(shortUsers);
  })
  .catch(error => console.error('Ошибка при загрузке users:', error));
fetch(baseUrl + '/todos')
  .then(response => response.json())
  .then(todos => {
    const incomplete = todos.filter(todo => !todo.completed);
    console.log('Незавершённые задачи (completed = false):');
    console.table(incomplete.slice(0, 10));
  })
  .catch(error => console.error('Ошибка при загрузке todos:', error));

  const baseUrl2 = 'https://jsonplaceholder.typicode.com';
async function getData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Ошибка: ' + response.status);
  return await response.json();
}

async function main() {
  try {
    const posts = await getData(baseUrl + '/posts');
    const sortedPosts = posts.sort((a, b) => b.title.length - a.title.length);
    console.log('Посты по убыванию длины title:');
    console.log(sortedPosts.slice(0, 5));
    const comments = await getData(baseUrl + '/comments');
    const sortedComments = comments.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    console.log('Комментарии, отсортированные по имени автора:');
    console.log(sortedComments.slice(0, 5));
    const users = await getData(baseUrl + '/users');
    const shortUsers = users.map(u => ({
      id: u.id,
      name: u.name,
      username: u.username,
      email: u.email,
      phone: u.phone
    }));
    console.log('Пользователи (только нужные поля):');
    console.table(shortUsers);
    const todos = await getData(baseUrl + '/todos');
    const incomplete = todos.filter(todo => !todo.completed);
    console.log('Незавершённые задачи (completed = false):');
    console.table(incomplete.slice(0, 10));
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}
main();
